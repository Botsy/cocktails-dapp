export const cocktailsContractAddress =
  '0xe9f1B66369b06588589226848a97738beaB283E5' as const;

export const cocktailsContractAbi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_imageUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_alcoholPercentage',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: '_cocktailType',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_price',
        type: 'uint8',
      },
    ],
    name: 'addCocktail',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
    ],
    name: 'CocktailAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rating',
        type: 'uint256',
      },
    ],
    name: 'CocktailRated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_rating',
        type: 'uint8',
      },
    ],
    name: 'rateCocktail',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'cocktails',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'alcoholPercentage',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'cocktailType',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'price',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'totalRatings',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'numberOfRatings',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCockltailCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getCocktail',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'alcoholPercentage',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'cocktailType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_averageRating',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
