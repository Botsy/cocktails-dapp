# 🍹 The Cocktail App Task

The **Cocktail App** is a project created as a task for LimeChain, showcasing the integration of Web2 and Web3 technologies. It utilizes the [Cocktail API](https://www.thecocktaildb.com/api.php) to explore recipes, perform advanced searches and manage favorites. On the Web3 side, it includes features like wallet integration, cocktail rating, adding new cocktails and real-time event handling.

## 🚀 Preview

Check out the hosted solution on Vercel: [Cocktail App](https://cocktails-dapp.vercel.app/)

---

## ✨ Features

### 🌐 Web2 Features
- **Cocktail Browsing**: Explore a list of cocktails.
- **Favorites Management**: Add, view, and manage your favorite cocktails (data is hashed).
- **Toast Notifications**: Get instant feedback for user actions.
- **Interactive Details**: Enjoy a sound effect when opening a cocktail's details dialog by clicking its image.
- **Random Cocktail Generator**: Discover a random cocktail with one click.
- **Search Functionality**: Search for cocktails by name or ingredient.
- **Category Filtering**: Filter cocktails based on categories.
- **Responsive Design**: Built with Chakra UI for a seamless experience across devices, supporting both light and dark themes.

### 🔗 Web3 Features
- **Wallet Integration**: Connect or disconnect your wallet with confirmation prompt.
- **Access Control**: Web2 features are disabled until a wallet is connected.
- **Enhanced Features**:
  - Add new cocktails.
  - Rate cocktails with a one-rating-per-cocktail limit.
- **Event Subscription**:
  - Listen for `CocktailAdded` and `CocktailRated` blockchain events.
  - Automatically invalidate and refetch data to stay up-to-date.

---

## 🛠️ Technologies Used
- **Frontend**: React, TypeScript, Chakra UI, React Icons, React Router
- **Blockchain**: Wagmi, Viem, TanStack Query
- **API Integration**: Axios, [Cocktail API](https://www.thecocktaildb.com/api.php), TanStack Query
- **Build Tool**: Vite

---
## ⚙️ Local Setup

### Prerequisites
1. **Node.js (v20 or higher)**:
   - Ensure you're using Node.js v20 or above.
   - It's recommended to use **nvm (Node Version Manager)** for managing Node.js versions.
   - Install **nvm** by following the [official instructions](https://github.com/nvm-sh/nvm).
   - Once installed, run the following commands:
     ```bash
     nvm install 20
     nvm use 20
     ```
   - Alternatively, simply run `nvm use` to use the version specified in the `.nvmrc` file.

### Setup Steps

1. **Install Dependencies**:
   Run the following command in your terminal:
   ```bash
   yarn install
   ```

2. **Start the Development Server**:
   After the dependencies are installed, start the local development server:
   ```bash
   yarn dev
   ```
   - Open your browser and navigate to `http://localhost:5173` to view the project.

3. **Preview the Production Build**:
   - Build the production-ready version:
     ```bash
     yarn build
     ```
   - Start the production preview server:
     ```bash
     yarn preview
     ```
   - Open your browser and navigate to `http://localhost:4173` to see the production build.
