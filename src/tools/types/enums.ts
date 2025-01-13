export enum WebTypeEnum {
  WEB_2 = 'web2',
  WEB_3 = 'web3',
  TEST = 'test',
}

export enum Web2QueryKeyEnum {
  GET_CATEGORIES = 'web2-categories',
  GET_ALL_COCKTAILS = 'web2-cocktails',
  GET_COCKTAILS_BY_CATEGORY = 'web2-category-cocktails',
  GET_COCKTAIL_BY_ID = 'web2-cocktail',
  GET_SEARCH_RESULT_BY_INGREDIENT = 'web2-search-ingredient',
  GET_SEARCH_RESULT_BY_NAME = 'web2-search-name',
  GET_RANDOM_COCKTAIL = 'web2-random',
}

export enum Web3QueryKeyEnum {
  GET_COCKTAILS_COUNT = 'web3-cocktails-count',
  GET_COCKTAIL_BY_ID = 'web3-cocktail',
  ADD_COCKTAIL = 'web3-add-cocktail',
  RATE_COCKTAIL = 'web3-rate-cocktail',
}
