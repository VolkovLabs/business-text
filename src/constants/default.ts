import { TextOptions } from '../types';
import { CodeLanguage, Format } from './editor';

/**
 * Default Options
 */
export const DefaultOptions: TextOptions = {
  content: '{{json @root}}',
  defaultContent: "The query didn't return any results.",
  editors: [],
  editor: { height: 200, format: Format.AUTO, language: CodeLanguage.MARKDOWN },
  everyRow: true,
  helpers: '',
  styles: '',
};
