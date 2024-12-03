import { InterpolateFunction } from '@grafana/data';

import { PartialItem, PartialItemConfig } from '../types';

/**
 * Fetch content
 */
export const fetchHtml = async (url: string, partialName: string): Promise<PartialItem> => {
  let content = 'Unable to load template\n';

  try {
    const response = await fetch(url);

    if (response && response.ok) {
      content = await response.text();
    }
  } catch {}

  return {
    name: partialName,
    content,
  };
};

/**
 * Fetch partials
 */
export const fetchAllPartials = async (items: PartialItemConfig[], replaceVariables: InterpolateFunction) => {
  return await Promise.all(items.map((item) => fetchHtml(replaceVariables(item.url), item.name)));
};
