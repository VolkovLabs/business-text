import { PanelPlugin } from '@grafana/data';
import { HelpersEditor, StylesEditor, TextEditor, TextPanel } from './components';
import { CodeLanguageOptions, DefaultOptions, EditorsOptions, EveryRowOptions, FormatOptions } from './constants';
import { EditorType, TextOptions } from './types';

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
    .addMultiSelect({
      path: 'editors',
      name: 'Select Editors to display. Editors with updated values always displayed.',
      settings: {
        options: EditorsOptions as any,
      },
      defaultValue: DefaultOptions.editors,
    });

  /**
   * Editor
   */
  builder
    .addRadio({
      path: 'editor.language',
      name: 'Primary Content Language',
      description: 'Used for formatting and suggestions.',
      settings: {
        options: CodeLanguageOptions,
      },
      defaultValue: DefaultOptions.editor.language,
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
      name: 'Default Content',
      description: 'Displayed when query result is empty.',
      defaultValue: DefaultOptions.defaultContent,
      editor: TextEditor,
      category: ['Content'],
      showIf: (config) =>
        config.editors.includes(EditorType.DEFAULT) || config.defaultContent !== DefaultOptions.defaultContent,
    })
    .addCustomEditor({
      id: 'helpers',
      path: 'helpers',
      name: 'JavaScript Code',
      description: 'Allows to add Handlebars Helpers and event handlers.',
      defaultValue: DefaultOptions.helpers,
      editor: HelpersEditor,
      category: ['Content'],
      showIf: (config) => config.editors.includes(EditorType.HELPERS) || config.helpers !== DefaultOptions.helpers,
    })
    .addCustomEditor({
      id: 'styles',
      path: 'styles',
      name: 'CSS Styles',
      description: 'Allows to add styles.',
      defaultValue: DefaultOptions.styles,
      editor: StylesEditor,
      category: ['Content'],
      showIf: (config) => config.editors.includes(EditorType.STYLES) || config.styles !== DefaultOptions.styles,
    });

  return builder;
});
