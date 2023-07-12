import { TextOptions } from '../types';
import { CodeLanguage, Format } from './editor';

/**
 * Default Options
 */
export const DefaultOptions: TextOptions = {
  content: '```json\n{{{json @root}}}\n```',
  defaultContent: "The query didn't return any results.",
  editor: { height: 200, format: Format.AUTO, language: CodeLanguage.MARKDOWN },
  editors: [],
  everyRow: true,
  helpers: '',
  styles: '',
};
