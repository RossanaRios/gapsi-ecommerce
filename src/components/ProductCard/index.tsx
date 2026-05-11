import { memo, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { Product } from '../../types/product.types';
import { ProductModal } from '../ProductModal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { stripHtml } from '../../utils/parseHtml';
import './index.css';

interface ProductCardProps {
  product: Product;
}

// memo — evita re-render de cards que no cambiaron durante infinite scroll
export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Observer Pattern: detecta cuando la card entra al viewport y aplica fade-in
  const cardRef = useIntersectionObserver({
    onIntersect: useCallback(() => setVisible(true), []),
    enabled: !visible,
    threshold: 0.05,
  });

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('product', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
  };

  const handleDragEnd = () => setIsDragging(false);

  const description = stripHtml(product.shortDescription || '');

  return (
    <Card
      ref={cardRef}
      className={`product-card ${isDragging ? 'dragging' : ''} ${visible ? 'visible' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      variant="outlined"
    >
      <div className="product-card-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
      </div>

      <CardContent className="product-card-content">
        <div className="product-card-row">
          <Typography className="product-card-name" title={product.name}>
            {product.name}
          </Typography>
          <Typography className="product-card-price">
            ${product.price.toFixed(2)}
          </Typography>
        </div>
        <Typography className="product-card-description">
          {description || product.name}
        </Typography>
        <Button
          className="product-card-more-btn"
          size="small"
          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
        >
          Ver más
        </Button>
      </CardContent>

      <ProductModal product={modalOpen ? product : null} onClose={() => setModalOpen(false)} />
    </Card>
  );
});
