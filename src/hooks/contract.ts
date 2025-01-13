import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import {
  getContract,
  GetContractReturnType,
  Log,
  PublicClient,
  WalletClient,
} from 'viem';
import {
  cocktailsContractAddress,
  cocktailsContractAbi,
} from '@tools/constants/contracts';
import { Cocktail } from '@tools/types/cocktails';
import { Web3QueryKeyEnum } from '@tools/types/enums';
import {
  addRatedCocktail,
  getRatedCocktails,
} from '@tools/utils/local-storage';
import { config } from '../../wagmi.config';

export const useContract = (address: `0x${string}`, ABI: any) => {
  const publicClient = usePublicClient({ config });
  const walletClient = useWalletClient({ config });

  return useMemo(() => {
    if (!address || !ABI || !publicClient || !walletClient) return null;

    const contract: GetContractReturnType<
      typeof ABI,
      PublicClient | WalletClient
    > = getContract({
      address,
      abi: ABI,
      client: {
        public: publicClient,
        wallet: walletClient.data as WalletClient,
      },
    });
    return contract;
  }, [address, ABI, publicClient, walletClient]);
};

export const useCocktailContract = (address?: `0x${string}`) => {
  const contract = useContract(
    address || cocktailsContractAddress,
    cocktailsContractAbi
  );
  const account = useAccount({ config });
  const queryClient = useQueryClient();

  const transformCocktailData = (id: number, rawData: any[]): Cocktail => ({
    id: id.toString(),
    name: rawData[0] || '',
    imageUrl: rawData[1] || '',
    category: rawData[2] || '',
    alcoholPercentage: rawData[3] ? Number(rawData[3]) : undefined,
    cocktailType: rawData[4] || '',
    price: rawData[5] ? Number(rawData[5]) : undefined,
    averageRating: rawData[6] ? Number(rawData[6]) : undefined,
  });

  return {
    // Add a new cocktail
    addCocktail: async (
      name: string,
      imageUrl: string,
      category: string,
      alcoholPercentage: number,
      cocktailType: string,
      price: number
    ) => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        await contract.write.addCocktail(
          [name, imageUrl, category, alcoholPercentage, cocktailType, price],
          { account: account.address || null, chain: account.chain }
        );
        Promise.resolve();
      } catch (error) {
        console.error('Error adding cocktail:', error);
        throw new Error('Failed to add cocktail. Please try again.');
      }
    },

    // Get a cocktail by ID
    getCocktailById: async (id: number): Promise<Cocktail> => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        const rawData = await contract.read.getCocktail([id]);
        return transformCocktailData(id, rawData as unknown as any[]);
      } catch (error) {
        console.error(`Error fetching cocktail with ID ${id}:`, error);
        throw new Error(`Failed to fetch cocktail with ID ${id}.`);
      }
    },

    // Get the total number of cocktails
    getCocktailCount: async (): Promise<number> => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        const result = await contract.read.getCockltailCount([]);
        return Number(result);
      } catch (error) {
        console.error('Error fetching cocktail count:', error);
        throw new Error('Failed to fetch the total number of cocktails.');
      }
    },

    // Rate a cocktail
    rateCocktail: async (id: number, rating: number) => {
      if (!contract) throw new Error('Contract not initialized');
      // Check if the user already rated this cocktail
      const ratedCocktails = getRatedCocktails();
      if (ratedCocktails.includes(id.toString())) {
        throw new Error('You have already rated this cocktail.');
      }

      try {
        await contract.write.rateCocktail([id, rating], {
          account: account.address || null,
          chain: account.chain,
        });
        addRatedCocktail(id);
        return Promise.resolve();
      } catch (error) {
        console.error(`Error rating cocktail with ID ${id}:`, error);
        throw new Error(`Failed to rate cocktail with ID ${id}.`);
      }
    },

    onCocktailAdded: (callback: (logs: Log[]) => void) => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        const unwatch = contract.watchEvent.CocktailAdded(
          {},
          {
            onLogs: (logs) => {
              callback(logs);
              // Refetch data for cocktails count to fetch new cocktails
              queryClient.invalidateQueries({
                queryKey: [Web3QueryKeyEnum.GET_COCKTAILS_COUNT],
              });
            },
            onError: (error) =>
              console.error('Error watching CocktailAdded:', error),
          }
        );

        return unwatch; // Return the unwatch function for cleanup
      } catch (error) {
        console.error('Error listening for cocktail added events:', error);
        throw new Error('Failed to set up event listener for cocktail added.');
      }
    },

    // Listen for cocktail rated events
    onCocktailRated: (callback: (logs: Log[]) => void) => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        const unwatch = contract.watchEvent.CocktailRated(
          {},
          {
            onLogs: (logs) => {
              callback(logs);
              logs.forEach((log) => {
                if (!log.args) {
                  console.warn('Missing args in event log:', log);
                  return;
                }
                // Refetch data for rated cocktail
                queryClient.invalidateQueries({
                  queryKey: [
                    Web3QueryKeyEnum.GET_COCKTAIL_BY_ID,
                    Number(log?.args?.id),
                  ],
                  refetchActive: false,
                  refetchInactive: false,
                });
              });
            },
            onError: (error) =>
              console.error('Error watching CocktailRated:', error),
          }
        );

        return unwatch; // Return the unwatch function for cleanup
      } catch (error) {
        console.error('Error listening for cocktail rated events:', error);
        throw new Error('Failed to set up event listener for cocktail rated.');
      }
    },
  };
};
