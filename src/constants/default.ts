import { TextOptions } from '../types';
import { CodeLanguage, Format } from './editor';

/**
 * Default Options
 */
export const DefaultOptions: TextOptions = {
  content: '',
  defaultContent: "The query didn't return any results.",
  everyRow: true,
  editor: { height: 400, format: Format.AUTO, language: CodeLanguage.MARKDOWN },
};
