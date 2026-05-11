import { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import logo from '../../assets/logo.png';
import './index.css';

interface HeaderProps {
  onReset: () => void;
}

// memo — re-renders only when onReset reference changes
export const Header = memo(function Header({ onReset }: HeaderProps) {
  return (
    <AppBar position="sticky" className="header-appbar">
      <Toolbar>
        <img src={logo} alt="Gapsi logo" className="header-logo" />
        <Typography variant="h6" className="header-title">
          e-Commerce Gapsi
        </Typography>
        <IconButton onClick={onReset} title="Reiniciar aplicación" className="header-reset-btn">
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});
