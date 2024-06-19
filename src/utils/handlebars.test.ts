import { registerHelpers } from './handlebars';

describe('Handlebars helpers', () => {
  describe('Register Helpers', () => {
    /**
     * Create Handlebars Mock
     */
    const createHandlebarsMock = () => {
      const handlers: Record<string, Function> = {};

      return {
        registerHelper: (name: string, handler: Function) => {
          handlers[name] = handler;
        },
        getHelper: (name: string) => handlers[name],
      };
    };

    /**
     * Handlebars Mock
     */
    const handlebarsMock = createHandlebarsMock();
    registerHelpers(handlebarsMock as never);

    it('And', () => {
      const handler = handlebarsMock.getHelper('and');

      expect(handler).toBeDefined();

      expect(handler(true, true)).toBeTruthy();
      expect(handler(true, false)).toBeFalsy();
      expect(handler(false, true)).toBeFalsy();
      expect(handler(false, false)).toBeFalsy();
    });

    it('Contains', () => {
      const handler = handlebarsMock.getHelper('contains');

      expect(handler).toBeDefined();

      expect(handler(['hello', 'world'], 'hello')).toBeTruthy();
      expect(handler(['hello', 'world'], 'hell')).toBeFalsy();
      expect(handler(['hello', 'world'], 'hello1')).toBeFalsy();
    });

    it('StartsWith', () => {
      const handler = handlebarsMock.getHelper('startsWith');

      expect(handler).toBeDefined();

      expect(handler('hello world', 'hello')).toBeTruthy();
      expect(handler('hello world', 'bye')).toBeFalsy();
    });

    it('EndsWith', () => {
      const handler = handlebarsMock.getHelper('endsWith');

      expect(handler).toBeDefined();

      expect(handler('hello world', 'world')).toBeTruthy();
      expect(handler('hello world', 'planet')).toBeFalsy();
    });

    it('Match', () => {
      const handler = handlebarsMock.getHelper('match');

      expect(handler).toBeDefined();

      expect(handler('This is a cool plugin.', /(cool)\s(plugin)/)).toBeTruthy();
      expect(handler('This is a cool plugin.', /^This is a plugin$/)).toBeFalsy();
    });

    it('Date', () => {
      const handler = handlebarsMock.getHelper('date');

      expect(handler).toBeDefined();

      const safeDate = new Date('02-02-2023');
      expect(handler(safeDate, 'YYYY')).toEqual('2023');
    });

    it('Eq', () => {
      const handler = handlebarsMock.getHelper('eq');

      expect(handler).toBeDefined();

      expect(handler('0', '0')).toBeTruthy();
      expect(handler(0, '0')).toBeFalsy();
    });

    it('Json', () => {
      const handler = handlebarsMock.getHelper('json');

      expect(handler).toBeDefined();

      const object = {
        name: '123',
        nestedObject: {
          key: 123,
        },
      };
      const expectedResult = JSON.stringify(object, null, 2);
      expect(handler(object)).toEqual(expectedResult);
    });

    it('Gt', () => {
      const handler = handlebarsMock.getHelper('gt');

      expect(handler).toBeDefined();

      expect(handler(2, 1)).toBeTruthy();
      expect(handler(2, 2)).toBeFalsy();
    });

    it('Gte', () => {
      const handler = handlebarsMock.getHelper('gte');

      expect(handler).toBeDefined();

      expect(handler(2, 1)).toBeTruthy();
      expect(handler(2, 2)).toBeTruthy();
    });

    it('Join', () => {
      const handler = handlebarsMock.getHelper('join');

      expect(handler).toBeDefined();

      expect(handler(['key1', 'key2'], ',')).toEqual('key1,key2');
      expect(handler(['key1', 'key2'], '-')).toEqual('key1-key2');
    });

    it('Lt', () => {
      const handler = handlebarsMock.getHelper('lt');

      expect(handler).toBeDefined();

      expect(handler(1, 2)).toBeTruthy();
      expect(handler(2, 2)).toBeFalsy();
    });

    it('Lte', () => {
      const handler = handlebarsMock.getHelper('lte');

      expect(handler).toBeDefined();

      expect(handler(1, 2)).toBeTruthy();
      expect(handler(2, 2)).toBeTruthy();
    });

    it('Not', () => {
      const handler = handlebarsMock.getHelper('not');

      expect(handler).toBeDefined();

      expect(handler('')).toBeTruthy();
      expect(handler(false)).toBeTruthy();
      expect(handler(true)).toBeFalsy();
    });

    it('Or', () => {
      const handler = handlebarsMock.getHelper('or');

      expect(handler).toBeDefined();

      expect(handler(false, true)).toBeTruthy();
      expect(handler(true, false)).toBeTruthy();
      expect(handler(false, false)).toBeFalsy();
    });

    it('Split', () => {
      const handler = handlebarsMock.getHelper('split');

      expect(handler).toBeDefined();

      expect(handler('key1,key2', ',')).toEqual(['key1', 'key2']);
      expect(handler('key1-key2', '-')).toEqual(['key1', 'key2']);
    });

    it('ToFixed', () => {
      const handler = handlebarsMock.getHelper('toFixed');

      expect(handler).toBeDefined();

      expect(handler('123', '123')).toEqual(0);
      expect(handler(100.12, 1)).toEqual('100.1');
    });

    it('UnlessEq', () => {
      const handler = handlebarsMock.getHelper('unlessEq');

      expect(handler).toBeDefined();

      expect(handler('111', '123')).toBeTruthy();
      expect(handler('111', 111)).toBeTruthy();
      expect(handler(111, 111)).toBeFalsy();
    });
  });
});
