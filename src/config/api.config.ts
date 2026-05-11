// API configuration — reads from environment variables
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_RAPIDAPI_BASE_URL as string,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY as string,
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST as string,
  },
} as const;

export const APP_VERSION = import.meta.env.VITE_APP_VERSION as string;
