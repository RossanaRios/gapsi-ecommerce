import { useState } from 'react';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RedoIcon from '@mui/icons-material/Redo';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product.types';
import './index.css';

export function Cart() {
  const { count, addToCart, isInCart } = useCart();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const product: Product = JSON.parse(e.dataTransfer.getData('product'));
      if (!isInCart(product.usItemId)) addToCart(product);
    } catch {
      // dato inválido — ignorar
    }
  };

  return (
    <div className="cart-wrapper">
      <div
        className={`cart-dropzone ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="cart-icons">
          <RedoIcon className="cart-redo-icon" />
          <Badge badgeContent={count} color="success" showZero max={99}>
            <ShoppingCartIcon fontSize="large" color="action" />
          </Badge>
        </div>
        <Typography className="cart-label">
          arrastra aquí tus productos
        </Typography>
      </div>
    </div>
  );
}
