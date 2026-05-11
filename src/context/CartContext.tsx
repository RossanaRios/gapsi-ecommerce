import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product.types';

interface CartContextValue {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      if (prev.some((p) => p.usItemId === product.usItemId)) return prev;
      return [...prev, product];
    });
  }, []);

  const isInCart = useCallback(
    (productId: string) => cartItems.some((p) => p.usItemId === productId),
    [cartItems]
  );

  const clearCart = useCallback(() => setCartItems([]), []);

  // useMemo avoids re-creating the context value on every render
  const value = useMemo(
    () => ({ cartItems, addToCart, isInCart, clearCart, count: cartItems.length }),
    [cartItems, addToCart, isInCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
