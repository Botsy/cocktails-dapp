import { useMemo } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { getContract, Log } from 'viem';
import { cocktailsContractConfig } from '@tools/constants/contracts';
import { Cocktail } from '@tools/types/cocktails';
import { config } from '../../wagmi.config';

export const useContract = (address: `0x${string}`, ABI: any) => {
  const publicClient = usePublicClient({ config });
  const walletClient = useWalletClient({ config });

  return useMemo(() => {
    if (!address || !ABI || !publicClient || !walletClient) return null;

    return getContract({
      address,
      abi: ABI,
      client: {
        public: publicClient,
        wallet: walletClient.data,
      },
    });
  }, [address, ABI, publicClient, walletClient]);
};

export const useCocktailContract = () => {
  const contract = useContract(
    cocktailsContractConfig.address,
    cocktailsContractConfig.abi
  );

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
        return await contract.write.addCocktail([
          name,
          imageUrl,
          category,
          alcoholPercentage,
          cocktailType,
          price,
        ]);
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

      try {
        return await contract.write.rateCocktail([id, rating]);
      } catch (error) {
        console.error(`Error rating cocktail with ID ${id}:`, error);
        throw new Error(`Failed to rate cocktail with ID ${id}.`);
      }
    },

    // Listen for cocktail added events
    onCocktailAdded: (callback: (event: Log[]) => void) => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        contract.watchEvent.CocktailAdded(
          {},
          {
            onLogs: (logs) => callback(logs),
          }
        );
      } catch (error) {
        console.error('Error listening for cocktail added events:', error);
        throw new Error('Failed to set up event listener for cocktail added.');
      }
    },

    // Listen for cocktail rated events
    onCocktailRated: (callback: (event: Log[]) => void) => {
      if (!contract) throw new Error('Contract not initialized');

      try {
        contract.watchEvent.CocktailRated(
          {},
          {
            onLogs: (logs) => callback(logs),
          }
        );
      } catch (error) {
        console.error('Error listening for cocktail rated events:', error);
        throw new Error('Failed to set up event listener for cocktail rated.');
      }
    },
  };
};
