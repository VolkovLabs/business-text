import React from 'react';
import { CodeEditor } from '@grafana/ui';
import { render, screen } from '@testing-library/react';
import { Format, TestIds } from '../../constants';
import { TextEditor } from './TextEditor';

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  CodeEditor: jest.fn().mockImplementation(() => null),
}));

/**
 * Mock timers
 */
jest.useFakeTimers();

/**
 * Text Editor
 */
describe('Text Editor', () => {
  const getContext = (modifiers: string[] = []) => {
    const editor = {
      height: 300,
      format: Format.NONE,
    };
    if (modifiers.includes('enableFormatting')) {
      editor.format = Format.AUTO;
    }

    return {
      options: {
        editor,
      },
    };
  };

  const getComponent = ({ ...restProps }: any, context = getContext()) => {
    return <TextEditor {...restProps} context={context} />;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should find component', async () => {
    render(getComponent({}));
    expect(screen.getByTestId(TestIds.textEditor.root)).toBeInTheDocument();
  });

  it('Should show mini map if value more than 100 symbols', () => {
    render(getComponent({ value: new Array(102).join('1') }));

    expect(CodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        showMiniMap: true,
      }),
      expect.anything()
    );
  });

  it('Should not enable formatting if disabled', () => {
    const runFormatDocument = jest.fn();
    const editor = {
      getAction: jest.fn().mockImplementation(() => ({
        run: runFormatDocument,
      })),
    };

    jest.mocked(CodeEditor).mockImplementation(({ onEditorDidMount }: any) => {
      onEditorDidMount(editor);
      return null;
    });

    render(getComponent({}, getContext([])));
    jest.runAllTimers();

    expect(CodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        monacoOptions: {
          formatOnPaste: false,
          formatOnType: false,
        },
      }),
      expect.anything()
    );
    expect(editor.getAction).not.toHaveBeenCalledWith('editor.action.formatDocument');
    expect(runFormatDocument).not.toHaveBeenCalled();
  });

  it('Should enable formatting if enabled', () => {
    const runFormatDocument = jest.fn();
    const editor = {
      getAction: jest.fn().mockImplementation(() => ({
        run: runFormatDocument,
      })),
    };

    jest.mocked(CodeEditor).mockImplementation(({ onEditorDidMount }: any) => {
      onEditorDidMount(editor);
      return null;
    });

    render(getComponent({}, getContext(['enableFormatting'])));
    jest.runAllTimers();

    expect(CodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        monacoOptions: {
          formatOnPaste: true,
          formatOnType: true,
        },
      }),
      expect.anything()
    );
    expect(editor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
    expect(runFormatDocument).toHaveBeenCalled();
  });

  it('Should save changes on blur', () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(CodeEditor).mockImplementation(({ onBlur }: any) => {
      onBlur(value);
      return null;
    });

    render(
      getComponent({
        onChange,
      })
    );

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('Should pass value on save', () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(CodeEditor).mockImplementation(({ onSave }: any) => {
      onSave(value);
      return null;
    });

    render(
      getComponent({
        onChange,
      })
    );

    expect(onChange).toHaveBeenCalledWith(value);
  });
});
