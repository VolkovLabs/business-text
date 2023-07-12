import { PanelPlugin } from '@grafana/data';
import { DefaultOptions } from './constants';
import { EditorType, PanelOptions } from './types';
import { plugin } from './module';

/*
 Plugin
 */
describe('plugin', () => {
  /**
   * Builder
   */
  const builder: any = {
    addCustomEditor: jest.fn().mockImplementation(() => builder),
    addRadio: jest.fn().mockImplementation(() => builder),
    addSliderInput: jest.fn().mockImplementation(() => builder),
    addMultiSelect: jest.fn().mockImplementation(() => builder),
  };

  it('Should be instance of PanelPlugin', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('Should add inputs', () => {
    /**
     * Supplier
     */
    plugin['optionsSupplier'](builder);

    /**
     * Inputs
     */
    expect(builder.addCustomEditor).toHaveBeenCalled();
    expect(builder.addRadio).toHaveBeenCalled();
    expect(builder.addSliderInput).toHaveBeenCalled();
    expect(builder.addMultiSelect).toHaveBeenCalled();
  });

  describe('Input Visibility', () => {
    beforeEach(() => {
      builder.addCustomEditor.mockClear();
    });

    /**
     * Add Input Implementation
     * @param config
     * @param result
     */
    const addInputImplementation = (config: Partial<PanelOptions>, result: string[]) => (input: any) => {
      if (input.showIf) {
        if (input.showIf(config)) {
          result.push(input.path);
        }
      } else {
        result.push(input.path);
      }

      return builder;
    };

    it('Should show default content if editor includes default type', () => {
      const shownOptionsPaths: string[] = [];

      builder.addCustomEditor.mockImplementation(
        addInputImplementation({ editors: [EditorType.DEFAULT] }, shownOptionsPaths)
      );
      plugin['optionsSupplier'](builder);

      expect(shownOptionsPaths).toEqual(expect.arrayContaining(['defaultContent']));
    });

    it('Should show default content if value is not default', () => {
      const shownOptionsPaths: string[] = [];

      builder.addCustomEditor.mockImplementation(
        addInputImplementation(
          { defaultContent: DefaultOptions.defaultContent + '123', editors: [] },
          shownOptionsPaths
        )
      );
      plugin['optionsSupplier'](builder);

      expect(shownOptionsPaths).toEqual(expect.arrayContaining(['defaultContent']));
    });

    it('Should show javascript helpers if helpers enabled', () => {
      const shownOptionsPaths: string[] = [];

      builder.addCustomEditor.mockImplementation(
        addInputImplementation({ editors: [EditorType.HELPERS] }, shownOptionsPaths)
      );
      plugin['optionsSupplier'](builder);

      expect(shownOptionsPaths).toEqual(expect.arrayContaining(['helpers']));
    });

    it('Should show styles helpers if helpers enabled', () => {
      const shownOptionsPaths: string[] = [];

      builder.addCustomEditor.mockImplementation(
        addInputImplementation({ editors: [EditorType.STYLES] }, shownOptionsPaths)
      );
      plugin['optionsSupplier'](builder);

      expect(shownOptionsPaths).toEqual(expect.arrayContaining(['styles']));
    });
  });
});
