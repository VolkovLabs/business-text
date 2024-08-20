import { useEffect, useState } from 'react';

import { PartialItem, PartialItemConfig } from '../types';

/**
 * Use Content Partials
 * @param items
 */
export const useContentPartials = (items: PartialItemConfig[]): PartialItem[] => {
  /**
   * State
   */
  const [htmlContents, setHtmlContents] = useState<PartialItem[]>([]);

  useEffect(() => {
    /**
     * Fetch content
     */
    const fetchHtml = async (url: string, partialName: string): Promise<PartialItem> => {
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

    const fetchAllHtml = async () => {
      const fetchedHtml = await Promise.all(items.map((item) => fetchHtml(item.url, item.name)));
      setHtmlContents(fetchedHtml);
    };

    if (items.length) {
      fetchAllHtml();
    }
  }, [items]);

  return htmlContents;
};
