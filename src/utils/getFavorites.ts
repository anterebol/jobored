export const getFavorites = (): Array<number> => {
  const favorites = global.window ? localStorage.getItem('favorites') : undefined;
  return favorites ? JSON.parse(favorites) : [];
};
