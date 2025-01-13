export const getRatedCocktails = (): string[] => {
  const stored = localStorage.getItem('ratedCocktails');
  return stored ? JSON.parse(stored) : [];
};

export const addRatedCocktail = (id: number): void => {
  const rated = getRatedCocktails();
  if (!rated.includes(id.toString())) {
    localStorage.setItem(
      'ratedCocktails',
      JSON.stringify([...rated, id.toString()])
    );
  }
};
