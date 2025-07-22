declare module 'helper-date' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare function DateHelper(str: string, pattern: string, options: unknown): string;

  export = DateHelper;
}
