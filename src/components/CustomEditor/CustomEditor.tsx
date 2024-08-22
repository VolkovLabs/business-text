import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import {
  CodeEditorMonacoOptions,
  CodeEditorSuggestionItem,
  CodeEditorSuggestionItemKind,
  useTheme2,
} from '@grafana/ui';
import { AutosizeCodeEditor } from '@volkovlabs/components';
/**
 * Monaco
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useMemo } from 'react';

import {
  AFTER_RENDER_EDITOR_SUGGESTIONS,
  CodeLanguage,
  EditorType,
  Format,
  HELPERS_EDITOR_SUGGESTIONS,
  TEST_IDS,
} from '../../constants';

/**
 * Properties
 */
interface Props extends StandardEditorProps {
  /**
   * Editor Type
   *
   * @type {EditorType}
   */
  type: EditorType;

  /**
   * Tooltip for the Modal window button
   *
   * @type {string}
   */
  modalButtonTooltip: string;
}

/**
 * Custom Editor
 */
export const CustomEditor: React.FC<Props> = ({
  value,
  onChange,
  context,
  type = EditorType.TEXT,
  modalButtonTooltip,
  item,
}) => {
  /**
   * Template Service to get Variables
   */
  const templateSrv = getTemplateSrv();

  /**
   * Theme
   */
  const theme = useTheme2();

  /**
   * Format On Mount
   */
  const onEditorMount = useCallback(
    (editor: monacoType.editor.IStandaloneCodeEditor) => {
      if (context.options.editor.format !== Format.AUTO || type === EditorType.STYLES) {
        return;
      }

      setTimeout(() => {
        editor.getAction('editor.action.formatDocument').run();
      }, 100);
    },
    [context.options.editor.format, type]
  );

  /**
   * Add all possible string and number properties from theme
   */
  const getStylesThemeSuggestions = useCallback(
    (entries: Array<[string, unknown]>, parentLabel = 'theme'): CodeEditorSuggestionItem[] => {
      const properties: CodeEditorSuggestionItem[] = [];

      for (const [key, value] of entries) {
        const label = `${parentLabel}.${key}`;

        if (typeof value === 'string' || typeof value === 'number') {
          properties.push({ label: `\${${label}}`, detail: key, kind: CodeEditorSuggestionItemKind.Property });
        } else if (typeof value === 'object' && value !== null) {
          const nestedEntries = Object.entries(value as Record<string, unknown>);
          properties.push(...getStylesThemeSuggestions(nestedEntries, label));
        }
      }

      return properties;
    },
    []
  );

  /**
   * Suggestions
   */
  const getSuggestions = useCallback((): CodeEditorSuggestionItem[] => {
    if (type === EditorType.TEXT) {
      return [];
    }

    /**
     * Add Variables
     */
    const suggestions = templateSrv.getVariables().map((variable) => {
      return {
        label: `\$\{${variable.name}\}`,
        kind: CodeEditorSuggestionItemKind.Property,
        detail: variable.description ? variable.description : variable.label,
      };
    });

    if (type === EditorType.STYLES) {
      return [...suggestions, ...getStylesThemeSuggestions(Object.entries(theme))];
    }

    if (type === EditorType.AFTER_RENDER) {
      return AFTER_RENDER_EDITOR_SUGGESTIONS.concat(suggestions);
    }

    return HELPERS_EDITOR_SUGGESTIONS.concat(suggestions);
  }, [getStylesThemeSuggestions, templateSrv, theme, type]);

  /**
   * Format Options
   */
  const monacoOptions = useMemo((): CodeEditorMonacoOptions => {
    if (type === EditorType.STYLES) {
      return {
        formatOnPaste: false,
        formatOnType: false,
        renderValidationDecorations: 'off',
      };
    }

    return context.options.editor.format === Format.AUTO
      ? { formatOnPaste: true, formatOnType: true }
      : { formatOnPaste: false, formatOnType: false };
  }, [context.options.editor.format, type]);

  /**
   * Language
   */
  const language = useMemo(() => {
    if (type === EditorType.HELPERS || type === EditorType.AFTER_RENDER) {
      return CodeLanguage.JAVASCRIPT;
    }

    if (type === EditorType.STYLES) {
      return CodeLanguage.SCSS;
    }

    return context.options.editor.language;
  }, [context.options.editor.language, type]);

  return (
    <div data-testid={TEST_IDS.textEditor.root}>
      <AutosizeCodeEditor
        language={language}
        showLineNumbers={true}
        showMiniMap={(value && value.length) > 100}
        value={value}
        onBlur={onChange}
        onSave={onChange}
        modalTitle={item.name}
        modalButtonTooltip={modalButtonTooltip}
        monacoOptions={{ ...monacoOptions, scrollBeyondLastLine: false }}
        onEditorDidMount={onEditorMount}
        getSuggestions={getSuggestions}
      />
    </div>
  );
};

/**
 * Text Editor
 * @param props
 * @constructor
 */
export const TextEditor: React.FC<StandardEditorProps> = (props) => (
  <CustomEditor {...props} type={EditorType.TEXT} modalButtonTooltip="Expand content editor" />
);

/**
 * Helpers Editor
 * @param props
 * @constructor
 */
export const HelpersEditor: React.FC<StandardEditorProps> = (props) => (
  <CustomEditor {...props} type={EditorType.HELPERS} modalButtonTooltip="Expand before render editor" />
);

/**
 * After Render Editor
 * @param props
 * @constructor
 */
export const AfterRenderEditor: React.FC<StandardEditorProps> = (props) => (
  <CustomEditor {...props} type={EditorType.AFTER_RENDER} modalButtonTooltip="Expand after render editor" />
);

/**
 * Styles Editor
 * @param props
 * @constructor
 */
export const StylesEditor: React.FC<StandardEditorProps> = (props) => (
  <CustomEditor {...props} type={EditorType.STYLES} modalButtonTooltip="Expand styles editor" />
);
