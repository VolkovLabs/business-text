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

import { PanelOptions } from '../types';
import { createExecutionCode } from './code';
import { beforeRenderCodeParameters } from './code-parameters';
import { registerHelpers } from './handlebars';
import { replaceVariablesHelper } from './variable';

/**
 * Helpers
 */
registerHelpers(handlebars);

/**
 * Generate HTML
 */
export const generateHtml = ({
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
}): { html: string; unsubscribe?: unknown } => {
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
    unsubscribe = func(
      beforeRenderCodeParameters.create({
        data,
        handlebars: handlebars,
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
  }

  /**
   * Handlebars
   */
  const template = handlebars.compile(content);
  const markdown = template(data);

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
