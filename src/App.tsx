import { useCallback, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AppRouter } from './router';

export default function App() {
  // resetKey forces a full re-mount of the router tree — clean reset
  const [resetKey, setResetKey] = useState(0);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <CartProvider>
      <AppRouter key={resetKey} onReset={handleReset} />
    </CartProvider>
  );
}
