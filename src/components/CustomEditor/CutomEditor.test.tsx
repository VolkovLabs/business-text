import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItemKind } from '@grafana/ui';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { CodeLanguage, Format, HELPERS_EDITOR_SUGGESTIONS, TEST_IDS } from '../../constants';
import { CustomEditor, HelpersEditor, StylesEditor, TextEditor } from './CustomEditor';

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  CodeEditor: jest.fn().mockImplementation(() => null),
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: jest.fn(),
}));

/**
 * Mock timers
 */
jest.useFakeTimers();

/**
 * Custom Editor
 */
describe('Custom Editor', () => {
  const getContext = (modifiers: string[] = []) => {
    const editor = {
      height: 300,
      format: Format.NONE,
      language: '123',
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

  /**
   * Get Tested Component
   * @param restProps
   * @param context
   */
  const getComponent = ({ ...restProps }: any, context = getContext()) => {
    return <CustomEditor {...restProps} context={context} />;
  };

  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should find component', async () => {
    render(getComponent({}));
    expect(screen.getByTestId(TEST_IDS.textEditor.root)).toBeInTheDocument();
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

  describe('Text Editor', () => {
    /**
     * Properties
     */
    const props: any = { context: { options: { editor: { language: '123' } } }, onChange };

    it('Should use language from options', () => {
      render(<TextEditor {...props} />);

      expect(CodeEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          language: '123',
        }),
        expect.anything()
      );
    });

    it('Should make correct suggestions', () => {
      let suggestionsResult;
      const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
      const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
      const variables = [variableWithDescription, variableWithoutDescription];

      jest.mocked(CodeEditor).mockImplementation(({ getSuggestions }: any) => {
        suggestionsResult = getSuggestions();
        return null;
      });
      jest.mocked(getTemplateSrv).mockImplementation(
        () =>
          ({
            getVariables: jest.fn().mockImplementation(() => variables),
          }) as any
      );

      render(<TextEditor {...props} />);

      expect(suggestionsResult).toEqual([]);
    });
  });

  describe('Helpers Editor', () => {
    /**
     * Properties
     */
    const props: any = { context: { options: { editor: {} } }, onChange };

    it('Should use javascript language', () => {
      render(<HelpersEditor {...props} />);

      expect(CodeEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          language: CodeLanguage.JAVASCRIPT,
        }),
        expect.anything()
      );
    });

    it('Should make correct suggestions', () => {
      let suggestionsResult;
      const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
      const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
      const variables = [variableWithDescription, variableWithoutDescription];

      jest.mocked(CodeEditor).mockImplementation(({ getSuggestions }: any) => {
        suggestionsResult = getSuggestions();
        return null;
      });
      jest.mocked(getTemplateSrv).mockImplementation(
        () =>
          ({
            getVariables: jest.fn().mockImplementation(() => variables),
          }) as any
      );

      render(<HelpersEditor {...props} />);

      expect(suggestionsResult).toEqual(expect.arrayContaining(HELPERS_EDITOR_SUGGESTIONS));
      expect(suggestionsResult).toEqual(
        expect.arrayContaining([
          {
            label: `\$\{${variableWithDescription.name}\}`,
            kind: CodeEditorSuggestionItemKind.Property,
            detail: variableWithDescription.description,
          },
        ])
      );
      expect(suggestionsResult).toEqual(
        expect.arrayContaining([
          {
            label: `\$\{${variableWithoutDescription.name}\}`,
            kind: CodeEditorSuggestionItemKind.Property,
            detail: variableWithoutDescription.label,
          },
        ])
      );
    });
  });

  describe('Styles Editor', () => {
    /**
     * Properties
     */
    const props: any = { context: { options: { editor: {} } }, onChange };

    it('Should use javascript language', () => {
      render(<StylesEditor {...props} />);

      expect(CodeEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          language: CodeLanguage.SCSS,
        }),
        expect.anything()
      );
    });

    it('Should make correct suggestions', () => {
      let suggestionsResult;
      const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
      const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
      const variables = [variableWithDescription, variableWithoutDescription];

      jest.mocked(CodeEditor).mockImplementation(({ getSuggestions }: any) => {
        suggestionsResult = getSuggestions();
        return null;
      });
      jest.mocked(getTemplateSrv).mockImplementation(
        () =>
          ({
            getVariables: jest.fn().mockImplementation(() => variables),
          }) as any
      );

      render(<StylesEditor {...props} />);

      expect(suggestionsResult).toEqual(
        expect.arrayContaining([
          {
            label: `\$\{${variableWithDescription.name}\}`,
            kind: CodeEditorSuggestionItemKind.Property,
            detail: variableWithDescription.description,
          },
        ])
      );
      expect(suggestionsResult).toEqual(
        expect.arrayContaining([
          {
            label: `\$\{${variableWithoutDescription.name}\}`,
            kind: CodeEditorSuggestionItemKind.Property,
            detail: variableWithoutDescription.label,
          },
        ])
      );
    });
  });
});
