import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';
import { CodeLanguage, Format, TestIds } from '../../constants';

/**
 * Monaco
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

/**
 * Properties
 */
interface Props extends StandardEditorProps {}

/**
 * Styles Editor
 */
export const StylesEditor: React.FC<Props> = ({ value, onChange, context }) => {
  /**
   * Template Service to get Variables
   */
  const templateSrv = getTemplateSrv();

  /**
   * Format On Mount
   */
  const onEditorMount = (editor: monacoType.editor.IStandaloneCodeEditor) => {
    if (context.options.editor.format !== Format.AUTO) {
      return;
    }

    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  };

  /**
   * Suggestions
   */
  const getSuggestions = (): CodeEditorSuggestionItem[] => {
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

    return [...suggestions];
  };

  /**
   * Format Options
   */
  const monacoOptions =
    context.options.editor.format === Format.AUTO
      ? { formatOnPaste: true, formatOnType: true }
      : { formatOnPaste: false, formatOnType: false };

  return (
    <div data-testid={TestIds.stylesEditor.root}>
      <CodeEditor
        language={CodeLanguage.SCSS}
        showLineNumbers={true}
        showMiniMap={(value && value.length) > 100}
        value={value}
        height={`${context.options.editor.height}px`}
        onBlur={(code) => {
          onChange(code);
        }}
        onSave={(code) => {
          onChange(code);
        }}
        monacoOptions={monacoOptions}
        onEditorDidMount={onEditorMount}
        getSuggestions={getSuggestions}
      />
    </div>
  );
};
