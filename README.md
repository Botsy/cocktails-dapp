# [SENIOR] FE Web3

# The Cocktail App (Formerly Punk Beer Web App)

_Objective: Use the cocktail api and blockchain to create a unique project that uses templating to show data on the page._

## Description

The [cocktail api https://www.thecocktaildb.com/api.php](https://www.thecocktaildb.com/api.php) doesn’t require a key to use and provides a lot of information in its responses.

## Tasks:

### Web2 part:

- Create a web app listing of some/all cocktails.
- Add search if the API allows it.
- You should then be able to show a separate list of the items you favorited. This will of course not be saved to any database.
- Add the sound of the opening cocktail when you click on the image of the cocktail (find a random sound from the internet).
- Create a "Get Random Cocktail". When someone clicks it shows them one random cocktail.
- If you think of your favorite list as a shopping cart, make sure you have a unique set of cocktails in it (no repetitions). Hint: bonus points for using hashed data to achieve this.
- Add filter by category.
- Add for search ingreadients by name

You can style your page to look like this example bellow. Please adapt your cocktail page with the appropriate content.

![https://cdn-images-1.medium.com/max/1200/1*z0dWsT-ud37k2lUbTM_8Hw.png](https://cdn-images-1.medium.com/max/1200/1*z0dWsT-ud37k2lUbTM_8Hw.png)

_Note: We would appreciate it if it works on the most major browsers (or atleast Chrome, Safari, Firefox and Brave)._

### Web3 part:

- Have a look at the [WAGMI](https://wagmi.sh/). Try to make a wallet and connect it to [Metamask (Chrome Widget)](https://metamask.io).
- “Unlock” the FE functionality only if a wallet is connected.
- Implement "Disconnect Wallet" functionality.
- Read these articles:
  [https://ethereum.org/en/developers/docs/web2-vs-web3/#:~:text=Web3%2C in the context of,without monetising their personal data](https://ethereum.org/en/developers/docs/web2-vs-web3/#:~:text=Web3%2C%20in%20the%20context%20of,without%20monetising%20their%20personal%20data).
  [https://ethereum.org/en/developers/docs/intro-to-ethereum/](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
  [https://ethereum.org/en/developers/docs/intro-to-ether/](https://ethereum.org/en/developers/docs/intro-to-ether/)
  [https://ethereum.org/en/developers/docs/dapps/](https://ethereum.org/en/developers/docs/dapps/)
  [https://ethereum.org/en/developers/docs/accounts/](https://ethereum.org/en/developers/docs/accounts/)
  [https://ethereum.org/en/developers/docs/transactions/](https://ethereum.org/en/developers/docs/transactions/)
  [https://ethereum.org/en/developers/docs/blocks/](https://ethereum.org/en/developers/docs/blocks/)
  Optionally:
  [https://ethereum.org/en/developers/docs/smart-contracts/](https://ethereum.org/en/developers/docs/smart-contracts/)
- Let’s try to communicate with the Blockchain:
  - Install Metamask
  - Create Wallet
  - Use WAGMI for connection to your wallet (metamask) and solve the tasks bellow:
- We’ve deployed a Smart Contract for you on Sepolia Network that can be accessed at the following address: [https://sepolia.etherscan.io/address/0xe9f1B66369b06588589226848a97738beaB283E5](https://sepolia.etherscan.io/address/0xe9f1B66369b06588589226848a97738beaB283E5)
- Your task is to try to read data from this smart contract instead of the **API above** and visualize data based on the returned data from the Smart Contract. You can read data from a smart :

  - `getCocktail(uint _id)` is returning info for cocktail (similar to the API above)
  - `getCocktailCount()` returns the current count of the cocktails that are written in the smart contract

- Send data to the contract using a “Transaction”.

  - `addCocktail(
    string memory _name,
    string memory _imageUrl,
    string memory _category,
    uint8 _alcoholPercentage,
    string memory _cocktailType,
    uint8 _price
)`
    is a way to add cocktails to the Smart Contract
  - `rateCocktail(uint _id, uint8 _rating)` is a way to rate cocktails.

- Add your custom hooks, for example
  - `useContract(address: string, ABI: any)` - for initializing any smart contract
  - `useCocktailContract(cocktailContractAddress: string)` - for using the cocktailApiContract by extending the above `useContract` hook

The full contract code:

```jsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CocktailAPI {
    struct Cocktail {
        string name;
        string imageUrl;
        string category;
        uint8 alcoholPercentage;
        string cocktailType;
        uint8 price;
        uint8 totalRatings;
        uint8 numberOfRatings;
    }

    Cocktail[] public cocktails;

    event CocktailAdded(uint id, string name, string category);
    event CocktailRated(uint id, uint rating);

    function addCocktail(
        string memory _name,
        string memory _imageUrl,
        string memory _category,
        uint8 _alcoholPercentage,
        string memory _cocktailType,
        uint8 _price
    ) public {
        cocktails.push(Cocktail(_name, _imageUrl, _category, _alcoholPercentage, _cocktailType, _price, 0, 0));
        emit CocktailAdded(cocktails.length - 1, _name, _category);
    }

    function rateCocktail(uint _id, uint8 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Rating should be between 1 and 5");
        Cocktail storage cocktail = cocktails[_id];
        cocktail.totalRatings += _rating;
        cocktail.numberOfRatings++;
        emit CocktailRated(_id, _rating);
    }

    function getCocktail(uint _id) public view returns (
        string memory name,
        string memory imageUrl,
        string memory category,
        uint8 alcoholPercentage,
        string memory cocktailType,
        uint price,
        uint _averageRating
    ) {
        Cocktail memory cocktail = cocktails[_id];
        uint averageRating = 0;
        if (cocktail.numberOfRatings > 0) {
            averageRating = cocktail.totalRatings / cocktail.numberOfRatings;
        }
        return (
            cocktail.name,
            cocktail.imageUrl,
            cocktail.category,
            cocktail.alcoholPercentage,
            cocktail.cocktailType,
            cocktail.price,
            averageRating
        );
    }

    function getCockltailCount() public view returns (uint) {
        return cocktails.length;
    }
}
```

The ABI of the compiled contract is:

```
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_cocktailType",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_price",
				"type": "uint8"
			}
		],
		"name": "addCocktail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			}
		],
		"name": "CocktailAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"name": "CocktailRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			}
		],
		"name": "rateCocktail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cocktails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "cocktailType",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "price",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "totalRatings",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "numberOfRatings",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCockltailCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCocktail",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "cocktailType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_averageRating",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
```
