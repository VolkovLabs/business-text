import {
  AlertErrorPayload,
  AlertPayload,
  DataFrame,
  EventBus,
  getLocale,
  GrafanaTheme2,
  InterpolateFunction,
  PanelData,
  textUtil,
  TimeRange,
} from '@grafana/data';
import { config, locationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import handlebars from 'handlebars';
import hljs from 'highlight.js';
// eslint-disable-next-line @typescript-eslint/naming-convention
import MarkdownIt from 'markdown-it';

import { PanelOptions, PartialItemConfig } from '../types';
import { createExecutionCode } from './code';
import { beforeRenderCodeParameters } from './code-parameters';
import { registerHelpers } from './handlebars';
import { fetchAllPartials } from './partials';
import { replaceVariablesHelper } from './variable';

/**
 * Helpers
 */
registerHelpers(handlebars);

/**
 * Generate HTML
 */
export const generateHtml = async ({
  data,
  content,
  helpers,
  timeRange,
  timeZone,
  replaceVariables,
  eventBus,
  options,
  panelData,
  dataFrame,
  notifySuccess,
  notifyError,
  theme,
  partials,
}: {
  data: Record<string, unknown>;
  content: string;
  helpers: string;
  timeRange: TimeRange;
  timeZone: TimeZone;
  replaceVariables: InterpolateFunction;
  eventBus: EventBus;
  options: PanelOptions;
  panelData: PanelData;
  dataFrame?: DataFrame;
  notifySuccess: (payload: AlertPayload) => void;
  notifyError: (payload: AlertErrorPayload) => void;
  theme: GrafanaTheme2;
  partials: PartialItemConfig[];
}): Promise<{ html: string; unsubscribe?: unknown }> => {
  /**
   * Variable
   */
  handlebars.registerHelper('variable', (name: string) => {
    return replaceVariablesHelper(name, replaceVariables);
  });

  /**
   * Variable value
   */
  handlebars.registerHelper('variableValue', (name: string) => {
    return replaceVariables(`${name}`);
  });

  /**
   * Create Markdown with Syntax Highlighting
   */
  const md = new MarkdownIt({
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, { language: lang }).value;
      }

      return '';
    },
  });

  /**
   * Unsubscribe
   */
  let unsubscribe: undefined | unknown;

  /**
   * Add Custom Helpers
   */
  if (helpers) {
    const func = createExecutionCode('context', helpers);

    /**
     * Unsubscribe
     */
    const result = func(
      beforeRenderCodeParameters.create({
        data,
        handlebars: handlebars,
        markdown: md,
        panelData,
        dataFrame,
        grafana: {
          getLocale,
          timeZone,
          theme,
          notifySuccess,
          notifyError,
          timeRange,
          replaceVariables,
          locationService,
          eventBus,
        },
      }),
      helpers
    );

    if (result instanceof Promise) {
      unsubscribe = await result;
    } else {
      unsubscribe = result;
    }
  }

  /**
   * Handlebars
   */
  const template = handlebars.compile(content);

  if (partials && !!partials.length) {
    /**
     * await fetching partials
     */
    const fetchedPartials = await fetchAllPartials(partials);

    /**
     * Register partials in handlebars
     */
    fetchedPartials.forEach((content) => {
      handlebars.registerPartial(content.name, content.content);
    });
  }

  const markdown = template(data);

  /**
   * Render Markdown
   */
  const html = options.wrap ? md.render(markdown) : md.renderInline(markdown);

  /**
   * Skip sanitizing if disabled in Grafana
   */
  if (config.disableSanitizeHtml) {
    return {
      html,
      unsubscribe,
    };
  }

  /**
   * Return sanitized HTML
   */
  return {
    html: textUtil.sanitize(html),
    unsubscribe,
  };
};
