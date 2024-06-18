import {
  AlertPayload,
  DataFrame,
  EventBus,
  getLocale,
  GrafanaTheme2,
  InterpolateFunction,
  PanelData,
  TimeRange,
} from '@grafana/data';
import { LocationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { CodeEditorSuggestionItemKind } from '@grafana/ui';
import { CodeParameterItem, CodeParametersBuilder } from '@volkovlabs/components';
import handlebars from 'handlebars';
// eslint-disable-next-line @typescript-eslint/naming-convention
import MarkdownIt from 'markdown-it';

/**
 * Render Code Parameters
 */
const renderCodeParameters = {
  detail: 'All passed possible properties and methods.',
  items: {
    data: new CodeParameterItem<object | object[]>('Row data.'),
    dataFrame: new CodeParameterItem<DataFrame | undefined>('Selected data frame.'),
    panelData: new CodeParameterItem<PanelData>('Selected data frame.'),
    grafana: {
      detail: 'Grafana properties and methods.',
      items: {
        eventBus: new CodeParameterItem<EventBus>('Panels events.'),
        locationService: new CodeParameterItem<LocationService>('Location service.'),
        replaceVariables: new CodeParameterItem<InterpolateFunction>(
          'Interpolate variables.',
          CodeEditorSuggestionItemKind.Method
        ),
        theme: new CodeParameterItem<GrafanaTheme2>('Location service.'),
        notifySuccess: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display successful notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        notifyError: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display error notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        getLocale: new CodeParameterItem<typeof getLocale>('Returns locale.', CodeEditorSuggestionItemKind.Method),
        timeZone: new CodeParameterItem<TimeZone>('Selected time zone.'),
        timeRange: new CodeParameterItem<TimeRange>('Selected time range.'),
      },
    },
  },
};

/**
 * Before Render Code Parameters
 */
export const beforeRenderCodeParameters = new CodeParametersBuilder({
  ...renderCodeParameters,
  items: {
    ...renderCodeParameters.items,
    handlebars: new CodeParameterItem<typeof handlebars>('Handlebars library.'),
    markdown: new CodeParameterItem<MarkdownIt>('Markdown-it instance.'),
  },
});

/**
 * After Render Code Parameters
 */
export const afterRenderCodeParameters = new CodeParametersBuilder({
  ...renderCodeParameters,
  items: {
    ...renderCodeParameters.items,
    element: new CodeParameterItem<HTMLElement>('Row html element.'),
  },
});
