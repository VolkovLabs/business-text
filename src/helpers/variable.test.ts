import { replaceVariablesHelper } from './variable';

describe('Variable helpers', () => {
  describe('Replace Variables Helper', () => {
    const safeDate = new Date('02-02-2023');
    it('Should collect array values', () => {
      const result = replaceVariablesHelper('array', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(['value1', 'value2']);
        }

        return '';
      });

      expect(result).toEqual(['value1', 'value2']);
    });

    it('Should format date to iso string', () => {
      const result = replaceVariablesHelper('__from:date', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(safeDate.valueOf());
        }

        return '';
      });

      expect(result).toEqual([safeDate.toISOString()]);
    });

    it('Should format date to unix seconds string', () => {
      const result = replaceVariablesHelper('__to:date:seconds', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(safeDate.valueOf());
        }

        return '';
      });

      const timestamp = safeDate.valueOf();
      expect(result).toEqual([(timestamp / 1000).toString()]);
    });

    it('Should format date to custom format', () => {
      const result = replaceVariablesHelper('__from:date:YYYY', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(safeDate.valueOf());
        }

        return '';
      });

      expect(result).toEqual(['2023']);

      const result2 = replaceVariablesHelper('__to:date:YYYY', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(safeDate.valueOf());
        }

        return '';
      });

      expect(result2).toEqual(['2023']);
    });

    it('Should format date to original value', () => {
      const result = replaceVariablesHelper('__from:123', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format(safeDate.valueOf());
        }

        return '';
      });

      expect(result).toEqual([safeDate.valueOf()]);
    });

    it('Should return original value', () => {
      const result = replaceVariablesHelper('someName', (value, scopedVars, format) => {
        if (typeof format === 'function') {
          format('123');
        }

        return '';
      });

      expect(result).toEqual(['123']);
    });
  });
});
