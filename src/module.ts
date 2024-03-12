import { Field, FieldConfigProperty, FieldType, PanelPlugin } from '@grafana/data';
import { config } from '@grafana/runtime';

import { AfterRenderEditor, HelpersEditor, ResourcesEditor, StylesEditor, TextEditor, TextPanel } from './components';
import {
  CODE_LANGUAGE_OPTIONS,
  DEFAULT_OPTIONS,
  EDITORS_OPTIONS,
  FORMAT_OPTIONS,
  RENDER_MODE_OPTIONS,
  WRAP_OPTIONS,
} from './constants';
import { getMigratedOptions } from './migration';
import { EditorType, PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(TextPanel)
  .setNoPadding()
  .setMigrationHandler(getMigratedOptions)
  .useFieldConfig({
    disableStandardOptions: [
      FieldConfigProperty.Unit,
      FieldConfigProperty.Color,
      FieldConfigProperty.Min,
      FieldConfigProperty.Max,
      FieldConfigProperty.Decimals,
      FieldConfigProperty.DisplayName,
      FieldConfigProperty.NoValue,
      FieldConfigProperty.Links,
      FieldConfigProperty.Mappings,
      'unitScale' as never,
      'fieldMinMax' as never,
    ],
  })
  .setPanelOptions((builder) => {
    builder
      .addSelect({
        path: 'renderMode',
        name: 'Render template',
        settings: {
          options: RENDER_MODE_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.renderMode,
      })
      .addMultiSelect({
        path: 'editors',
        name: 'Select Editors to display. Editors with updated values always displayed.',
        settings: {
          options: EDITORS_OPTIONS as never,
        },
        defaultValue: DEFAULT_OPTIONS.editors,
      })
      .addFieldNamePicker({
        path: 'status',
        name: 'Field with status value. To be used to get statusColor based on thresholds.',
        settings: {
          filter: (f: Field) => f.type === FieldType.number,
          noFieldsMessage: 'No number fields found',
        },
      });

    /**
     * External Resources
     */
    builder
      .addCustomEditor({
        id: 'externalStyles',
        path: 'externalStyles',
        name: 'Styles',
        defaultValue: DEFAULT_OPTIONS.externalStyles,
        editor: ResourcesEditor,
        category: ['External Resources'],
        showIf: () => config.disableSanitizeHtml,
      })
      .addCustomEditor({
        id: 'externalScripts',
        path: 'externalScripts',
        name: 'Scripts',
        defaultValue: DEFAULT_OPTIONS.externalScripts,
        editor: ResourcesEditor,
        category: ['External Resources'],
        showIf: () => config.disableSanitizeHtml,
      })
      .addCustomEditor({
        id: 'externalStyles',
        path: 'externalStyles',
        name: 'Styles',
        defaultValue: DEFAULT_OPTIONS.externalStyles,
        editor: ResourcesEditor,
        settings: {
          sanitize: !config.disableSanitizeHtml,
        },
        category: ['External Resources'],
        showIf: () => !config.disableSanitizeHtml,
      })
      .addCustomEditor({
        id: 'externalScripts',
        path: 'externalScripts',
        name: 'Scripts',
        defaultValue: DEFAULT_OPTIONS.externalScripts,
        editor: ResourcesEditor,
        settings: {
          sanitize: !config.disableSanitizeHtml,
        },
        category: ['External Resources'],
        showIf: () => !config.disableSanitizeHtml,
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
          options: CODE_LANGUAGE_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.editor.language,
        category: ['Editor'],
      })
      .addRadio({
        path: 'editor.format',
        name: 'Formatting',
        settings: {
          options: FORMAT_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.editor.format,
        category: ['Editor'],
      });

    /**
     * Content
     */
    builder
      .addRadio({
        path: 'wrap',
        name: 'Wrap automatically in paragraphs',
        description: 'If disabled, result will NOT be wrapped into <p> tags.',
        defaultValue: DEFAULT_OPTIONS.wrap,
        settings: {
          options: WRAP_OPTIONS,
        },
        category: ['Content'],
      })
      .addCustomEditor({
        id: 'content',
        path: 'content',
        name: 'Content',
        defaultValue: DEFAULT_OPTIONS.content,
        editor: TextEditor,
        category: ['Content'],
      })
      .addCustomEditor({
        id: 'defaultContent',
        path: 'defaultContent',
        name: 'Default Content',
        description: 'Displayed when query result is empty.',
        defaultValue: DEFAULT_OPTIONS.defaultContent,
        editor: TextEditor,
        category: ['Content'],
        showIf: (config) =>
          config.editors.includes(EditorType.DEFAULT) || config.defaultContent !== DEFAULT_OPTIONS.defaultContent,
      });

    /**
     * JavaScript
     */
    builder
      .addCustomEditor({
        id: 'helpers',
        path: 'helpers',
        name: 'Before Content Rendering',
        description: 'Allows to execute code before content rendering. E.g. add Handlebars Helpers.',
        defaultValue: DEFAULT_OPTIONS.helpers,
        editor: HelpersEditor,
        category: ['JavaScript'],
        showIf: (config) => config.editors.includes(EditorType.HELPERS) || config.helpers !== DEFAULT_OPTIONS.helpers,
      })
      .addCustomEditor({
        id: 'afterRender',
        path: 'afterRender',
        name: 'After Content Ready',
        description:
          'Allows to execute code after content is ready. E.g. use element for drawing chart or event listeners.',
        defaultValue: DEFAULT_OPTIONS.afterRender,
        editor: AfterRenderEditor,
        category: ['JavaScript'],
        showIf: (config) =>
          config.editors.includes(EditorType.AFTER_RENDER) || config.afterRender !== DEFAULT_OPTIONS.afterRender,
      });

    /**
     * Styles
     */
    builder.addCustomEditor({
      id: 'styles',
      path: 'styles',
      name: 'CSS Styles',
      description: 'Allows to add styles. Use & {} for parent style.',
      defaultValue: DEFAULT_OPTIONS.styles,
      editor: StylesEditor,
      category: ['CSS Styles'],
      showIf: (config) => config.editors.includes(EditorType.STYLES) || config.styles !== DEFAULT_OPTIONS.styles,
    });

    return builder;
  });
