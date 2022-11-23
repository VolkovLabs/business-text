import { PanelPlugin } from '@grafana/data';
import { TextEditor, TextPanel } from './components';
import { CodeLanguageOptions, DefaultOptions, EveryRowOptions, FormatOptions } from './constants';
import { TextOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<TextOptions>(TextPanel).setPanelOptions((builder) => {
  builder.addRadio({
    path: 'everyRow',
    name: 'Render template',
    settings: {
      options: EveryRowOptions,
    },
    defaultValue: DefaultOptions.everyRow,
  });

  /**
   * Editor
   */
  builder
    .addRadio({
      path: 'editor.language',
      name: 'Primary Language',
      description: 'Used for formatting and suggestions.',
      settings: {
        options: CodeLanguageOptions,
      },
      defaultValue: DefaultOptions.editor.language,
      category: ['Editor'],
    })
    .addRadio({
      path: 'editor.format',
      name: 'Code Formatting',
      settings: {
        options: FormatOptions,
      },
      defaultValue: DefaultOptions.editor.format,
      category: ['Editor'],
    })
    .addSliderInput({
      path: 'editor.height',
      name: 'Height, px',
      defaultValue: DefaultOptions.editor.height,
      settings: {
        min: 100,
        max: 2000,
      },
      category: ['Editor'],
    });

  /**
   * Content
   */
  builder
    .addCustomEditor({
      id: 'content',
      path: 'content',
      name: 'Content',
      defaultValue: DefaultOptions.content,
      editor: TextEditor,
      category: ['Content'],
    })
    .addCustomEditor({
      id: 'defaultContent',
      path: 'defaultContent',
      name: 'Default content',
      description: 'Displayed when query result is empty.',
      defaultValue: DefaultOptions.defaultContent,
      editor: TextEditor,
      category: ['Content'],
    });

  return builder;
});
