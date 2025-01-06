import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ChakraUiProvider } from '@/components/ui/provider';
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5, // 5 min
      retry: false,
    },
  },
});

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraUiProvider>
          <App />
        </ChakraUiProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
