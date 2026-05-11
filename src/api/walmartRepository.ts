/**
 * DESIGN PATTERN: Repository Pattern
 *
 * Abstracts all data access logic behind a clean interface.
 * The rest of the app never knows where data comes from —
 * it just calls this repository and gets domain objects back.
 */

import { API_CONFIG } from '../config/api.config';
import type { Product, SearchResult, SearchParams } from '../types/product.types';

// Maps raw API response item to our domain Product type
function mapToProduct(item: Record<string, unknown>): Product {
  const imageInfo = item.imageInfo as Record<string, string> | undefined;
  return {
    usItemId: item.usItemId as string,
    name: item.name as string,
    price: (item.price as number) ?? 0,
    imageUrl: (item.image as string) || imageInfo?.thumbnailUrl || '',
    shortDescription: (item.shortDescription || item.description) as string | undefined,
  };
}

export const walmartRepository = {
  async searchProducts({ keyword, page }: SearchParams): Promise<SearchResult> {
    const url = new URL(`${API_CONFIG.baseUrl}/wlm/walmart-search-by-keyword`);
    url.searchParams.set('keyword', keyword);
    url.searchParams.set('page', String(page));
    url.searchParams.set('sortBy', 'best_match');

    const response = await fetch(url.toString(), {
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const items: Record<string, unknown>[] =
      data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks?.[0]?.items ?? [];

    return {
      products: items.filter((i) => i.usItemId).map(mapToProduct),
      totalResults: data.item?.props?.pageProps?.initialData?.searchResult?.title?.info?.title ? items.length : 0,
      currentPage: page,
    };
  },
};
