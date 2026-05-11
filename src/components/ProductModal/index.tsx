import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import type { Product } from '../../types/product.types';
import './index.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="product-modal-title">
        {product.name}
        <IconButton className="product-modal-close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="product-modal-content">
        <div className="product-modal-image-wrapper">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-modal-image"
          />
        </div>

        <Typography className="product-modal-price">
          ${product.price.toFixed(2)}
        </Typography>

        {product.shortDescription && (
          <div
            className="product-modal-description"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
