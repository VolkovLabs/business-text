import { useEffect, useState } from 'react';

import { ContentItem, PartialItem } from '../types';

/**
 * Use Content Partials
 * @param items
 */
export const useContentPartials = (items: PartialItem[]): { htmlContents: ContentItem[] } => {
  const [htmlContents, setHtmlContents] = useState<ContentItem[]>([]);

  useEffect(() => {
    /**
     * Fetch content
     */
    const fetchHtml = async (url: string, partialName: string): Promise<ContentItem> => {
      const response = await fetch(url);
      const html = await response.text();
      return {
        name: partialName,
        content: html,
      };
    };

    const fetchAllHtml = async () => {
      const fetchedHtml = await Promise.all(items.map((item) => fetchHtml(item.url, item.name)));
      setHtmlContents(fetchedHtml);
    };

    if (items.length) {
      fetchAllHtml();
    }
  }, [items]);

  return {
    htmlContents,
  };
};
