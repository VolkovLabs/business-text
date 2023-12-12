import { getMigratedOptions } from './migration';
import { RenderMode } from './types';

describe('Migration', () => {
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
