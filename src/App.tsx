import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider, serialize, deserialize } from 'wagmi';
import PageWrapper from '@components/common/page-wrapper';
import { Provider as ChakraUiProvider } from '@components/ui/provider';
import Router from './Router';
import { config } from '../wagmi.config';
import { Web3EventsProvider } from '@contexts/web3-events';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5, // 5 mins
      gcTime: 1000 * 60 * 60 * 24, // 24h
      retry: 2,
      placeholderData: (prev: unknown) => prev,
    },
  },
});

const persister = createSyncStoragePersister({
  serialize,
  storage: window.localStorage,
  throttleTime: 5000, // 5s
  deserialize,
});

function App() {
  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <ChakraUiProvider>
            <PageWrapper>
              <Web3EventsProvider>
                <Router />
              </Web3EventsProvider>
            </PageWrapper>
          </ChakraUiProvider>
        </BrowserRouter>
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
