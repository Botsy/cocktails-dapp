import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  FC,
  ReactNode,
} from 'react';
import { useCocktailContract } from '@hooks/contract';

type Web3EventsContextType = {
  startListening: () => void;
  stopListening: () => void;
};

const Web3EventsContext = createContext<Web3EventsContextType | undefined>(
  undefined
);

export const Web3EventsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { onCocktailRated, onCocktailAdded } = useCocktailContract();
  const unwatchRatedRef = useRef<() => void>();
  const unwatchAddedRef = useRef<() => void>();

  const startListening = useCallback(() => {
    try {
      unwatchRatedRef.current = onCocktailRated((logs) => {
        console.log('Cocktail Rated Event:', logs);
      });

      unwatchAddedRef.current = onCocktailAdded((logs) => {
        console.log('Cocktail Added Event:', logs);
      });

      console.log('Started listening for events');
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  }, [onCocktailRated, onCocktailAdded]);

  const stopListening = useCallback(() => {
    try {
      unwatchRatedRef.current?.();
      unwatchAddedRef.current?.();
      console.log('Stopped listening for events');
    } catch (error) {
      console.error('Error stopping event listeners:', error);
    }
  }, []);

  useEffect(() => {
    // Start listening on mount
    startListening();

    // Cleanup on unmount
    return () => {
      stopListening();
    };
  }, [startListening, stopListening]);

  return (
    <Web3EventsContext.Provider value={{ startListening, stopListening }}>
      {children}
    </Web3EventsContext.Provider>
  );
};

export const useWeb3Events = () => {
  const context = useContext(Web3EventsContext);
  if (!context) {
    throw new Error('useWeb3Events must be used within a Web3EventsProvider');
  }
  return context;
};
