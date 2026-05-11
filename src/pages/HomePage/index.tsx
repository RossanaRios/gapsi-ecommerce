import { useMemo, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchBar } from '../../components/SearchBar';
import { ProductList } from '../../components/ProductList';
import { Cart } from '../../components/Cart';
import { useProductSearch } from '../../hooks/useProductSearch';
import { useCart } from '../../context/CartContext';
import './index.css';

export default function HomePage() {
  const { products, isLoading, error, hasMore, search, loadMore, reset } = useProductSearch();
  const { cartItems } = useCart();

  // Set de IDs en carrito — memoizado para filtrado eficiente en ProductList
  const cartItemIds = useMemo(
    () => new Set(cartItems.map((p) => p.usItemId)),
    [cartItems]
  );

  useCallback(() => reset(), [reset]);

  return (
    <div className="homepage-container">

      <SearchBar onSearch={search} isLoading={isLoading} />

      {products.length > 0 && <Cart />}

      {error && (
        <Alert severity="error" className="homepage-error">{error}</Alert>
      )}

      {isLoading && products.length === 0 && (
        <div className="homepage-loader">
          <CircularProgress size={48} />
        </div>
      )}

      {products.length > 0 ? (
        <ProductList
          products={products}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          cartItemIds={cartItemIds}
        />
      ) : (
        !isLoading && <div style={{ flexGrow: 1 }} />
      )}

    </div>
  );
}
