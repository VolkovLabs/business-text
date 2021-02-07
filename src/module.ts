import { PanelPlugin } from '@grafana/data';
import { TextOptions } from './types';
import { TextPanel } from './TextPanel';

export const plugin = new PanelPlugin<TextOptions>(TextPanel).setNoPadding().setPanelOptions((builder) => {
  return builder.addTextInput({
    path: 'content',
    name: 'Content',
    description: 'Supports Markdown and Handlebars',
    settings: {
      useTextarea: true,
      rows: 5,
    },
  });
});
