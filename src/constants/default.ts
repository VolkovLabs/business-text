import { TextOptions } from '../types';
import { Format } from './editor';

/**
 * Default Options
 */
export const DefaultOptions: TextOptions = {
  content: '',
  defaultContent: "The query didn't return any results.",
  everyRow: true,
  editor: { height: 600, format: Format.AUTO },
};
