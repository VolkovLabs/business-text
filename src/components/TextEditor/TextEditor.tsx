import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from '@grafana/ui';
import { Format } from '../../constants';

/**
 * Monaco
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

/**
 * Properties
 */
interface Props extends StandardEditorProps {}

/**
 * Text Editor
 */
export const TextEditor: React.FC<Props> = ({ value, onChange, context }) => {
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
   * Format Options
   */
  const monacoOptions =
    context.options.editor.format === Format.AUTO
      ? { formatOnPaste: true, formatOnType: true }
      : { formatOnPaste: false, formatOnType: false };

  return (
    <div>
      <CodeEditor
        language={context.options.editor.language}
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
      />
    </div>
  );
};
