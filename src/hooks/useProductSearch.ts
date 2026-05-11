import { useState, useCallback, useRef } from 'react';
import { walmartRepository } from '../api/walmartRepository';
import type { Product } from '../types/product.types';

interface UseProductSearchReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  search: (keyword: string) => void;
  loadMore: () => void;
  reset: () => void;
}

export function useProductSearch(): UseProductSearchReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const keywordRef = useRef('');
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const fetchProducts = useCallback(async (keyword: string, page: number, append: boolean) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await walmartRepository.searchProducts({ keyword, page });
      setProducts((prev) => append ? [...prev, ...result.products] : result.products);
      setHasMore(result.products.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const search = useCallback((keyword: string) => {
    keywordRef.current = keyword;
    pageRef.current = 1;
    fetchProducts(keyword, 1, false);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    // Usa isFetchingRef en vez de isLoading para evitar re-creación del callback
    if (!keywordRef.current || !hasMore || isFetchingRef.current) return;
    pageRef.current += 1;
    fetchProducts(keywordRef.current, pageRef.current, true);
  }, [fetchProducts, hasMore]);

  const reset = useCallback(() => {
    keywordRef.current = '';
    pageRef.current = 1;
    setProducts([]);
    setError(null);
    setHasMore(false);
  }, []);

  return { products, isLoading, error, hasMore, search, loadMore, reset };
}
