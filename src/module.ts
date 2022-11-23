import { PanelPlugin } from '@grafana/data';
import { TextPanel } from './components';
import { DefaultOptions, EveryRowOptions, FormatOptions } from './constants';
import { TextOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<TextOptions>(TextPanel).setPanelOptions((builder) => {
  builder
    .addRadio({
      path: 'everyRow',
      name: 'Render template',
      settings: {
        options: EveryRowOptions,
      },
      defaultValue: DefaultOptions.everyRow,
    })
    .addTextInput({
      path: 'defaultContent',
      name: 'Default content',
      description: 'Displayed when query result is empty. Supports Markdown and Handlebars',
      defaultValue: DefaultOptions.defaultContent,
      settings: {
        useTextarea: true,
        rows: 5,
      },
    });

  /**
   * Editor
   */
  builder
    .addSliderInput({
      path: 'editor.height',
      name: 'Height, px',
      defaultValue: DefaultOptions.editor.height,
      settings: {
        min: 100,
        max: 2000,
      },
      category: ['Editor'],
    })
    .addRadio({
      path: 'editor.format',
      name: 'Formatting',
      settings: {
        options: FormatOptions,
      },
      defaultValue: DefaultOptions.editor.format,
      category: ['Editor'],
    })
    .addTextInput({
      path: 'content',
      name: 'Content',
      description: 'Supports Markdown and Handlebars',
      settings: {
        useTextarea: true,
        rows: 5,
      },
      defaultValue: DefaultOptions.content,
      category: ['Editor'],
    });

  return builder;
});
