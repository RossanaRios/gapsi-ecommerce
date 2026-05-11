import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Header } from '../components/Header';

// Lazy loading — HomePage se carga solo cuando se visita la ruta
const HomePage = lazy(() => import('../pages/HomePage'));

function LoadingFallback() {
  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <CircularProgress />
    </Box>
  );
}

interface AppRouterProps {
  onReset: () => void;
}

export function AppRouter({ onReset }: AppRouterProps) {
  return (
    <BrowserRouter>
      <Header onReset={onReset} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
