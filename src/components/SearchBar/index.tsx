import { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import './index.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

// memo — evita re-render mientras se cargan productos
export const SearchBar = memo(function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar-form">
      <TextField
        className="searchbar-input"
        size="small"
        placeholder="Buscar productos... (ej: nintendo, laptop, sony)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        className="searchbar-btn"
        disabled={isLoading || !value.trim()}
        startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
      >
        Buscar
      </Button>
    </form>
  );
});
