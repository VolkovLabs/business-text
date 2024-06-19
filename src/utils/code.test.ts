import { createExecutionCode } from './code';

describe('Code', () => {
  describe('createExecutionCode', () => {
    const logError = jest.fn();
    const logInfo = jest.fn();

    beforeAll(() => {
      jest.spyOn(console, 'error');
      jest.spyOn(console, 'log');

      jest.mocked(console.error).mockImplementation(logError);
      jest.mocked(console.log).mockImplementation(logInfo);
    });

    /**
     * Restore original console
     */
    afterAll(() => {
      jest.mocked(console.error).mockRestore();
      jest.mocked(console.log).mockRestore();
    });

    it('Should create function', () => {
      const result = createExecutionCode('return 123');

      expect(result).toBeInstanceOf(Function);
      expect(result()).toEqual(123);
    });

    it('Should handle syntax error', () => {
      const code = 'con b = 1;';
      const result = createExecutionCode(code);

      expect(result).toBeInstanceOf(Function);
      expect(console.error).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(code);
    });
  });
});
