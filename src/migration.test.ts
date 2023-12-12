import { getMigratedOptions } from './migration';
import { PanelOptions, RenderMode } from './types';

describe('Migration', () => {
  it('Should return panel options', () => {
    const options: Partial<PanelOptions> = {
      renderMode: RenderMode.EVERY_ROW,
    };

    expect(
      getMigratedOptions({
        options: options as any,
      } as any)
    ).toEqual(options);
  });

  describe('4.3.0', () => {
    it('Should normalize everyRow', () => {
      expect(getMigratedOptions({ options: { everyRow: true } } as any)).toHaveProperty(
        'renderMode',
        RenderMode.EVERY_ROW
      );
      expect(getMigratedOptions({ options: { everyRow: false } } as any)).toHaveProperty(
        'renderMode',
        RenderMode.ALL_ROWS
      );
    });
  });
});
