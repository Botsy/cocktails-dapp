import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import PageWrapper from '@components/common/page-wrapper';
import { Provider as ChakraUiProvider } from '@components/ui/provider';
import Router from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ChakraUiProvider>
          <PageWrapper>
            <Router />
          </PageWrapper>
        </ChakraUiProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
