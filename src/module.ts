import { PanelPlugin } from '@grafana/data';
import { TextPanel } from './components';
import { TextOptions } from './types';

export const plugin = new PanelPlugin<TextOptions>(TextPanel).setNoPadding().setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'content',
      name: 'Content',
      description: 'Supports Markdown and Handlebars',
      settings: {
        useTextarea: true,
        rows: 5,
      },
    })
    .addTextInput({
      path: 'defaultContent',
      name: 'Default content',
      description: 'Displayed when query result is empty. Supports Markdown and Handlebars',
      defaultValue: "The query didn't return any results.",
      settings: {
        useTextarea: true,
        rows: 5,
      },
    })
    .addBooleanSwitch({
      path: 'everyRow',
      name: 'Render template for every row',
      defaultValue: true,
    });
});
