import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/product.types';
import './index.css';

const ROW_HEIGHT = 296;

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  cartItemIds: Set<string>;
}

export function ProductList({ products, isLoading, hasMore, onLoadMore, cartItemIds }: ProductListProps) {
  const isWide   = useMediaQuery('(min-width: 950px)');
  const isMobile = useMediaQuery('(max-width: 599px)');
  const columns  = isWide ? 3 : isMobile ? 1 : 2;

  // Mide la altura real del contenedor para pasarla a react-window
  const containerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(500);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setListHeight(entries[0].contentRect.height);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const visibleProducts = useMemo(
    () => products.filter((p) => !cartItemIds.has(p.usItemId)),
    [products, cartItemIds]
  );

  const rows = useMemo(() => {
    const result: Product[][] = [];
    for (let i = 0; i < visibleProducts.length; i += columns) {
      result.push(visibleProducts.slice(i, i + columns));
    }
    return result;
  }, [visibleProducts, columns]);

  const Row = useCallback(({ index, style }: ListChildComponentProps) => (
    <div style={style} className={`product-list-row product-list-row--${columns}col`}>
      {rows[index].map((product) => (
        <div key={product.usItemId} className="product-list-item">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  ), [rows, columns]);

  // Observer Pattern: detecta cuando el usuario llega al final de la lista
  const handleItemsRendered = useCallback(({ visibleStopIndex }: { visibleStopIndex: number }) => {
    if (visibleStopIndex >= rows.length - 2 && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [rows.length, hasMore, isLoading, onLoadMore]);

  return (
    <div className="product-list-container" ref={containerRef}>
      <FixedSizeList
        height={listHeight}
        itemCount={rows.length}
        itemSize={ROW_HEIGHT}
        width="100%"
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </FixedSizeList>

      {isLoading && (
        <div className="product-list-loader">
          <CircularProgress size={28} />
        </div>
      )}

      {!hasMore && visibleProducts.length > 0 && !isLoading && (
        <p className="product-list-end">No hay más productos</p>
      )}
    </div>
  );
}
