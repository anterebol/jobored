export const getFavorites = () => {
  const favorites = global.window ? localStorage.getItem('favorites') : undefined;
  return favorites ? JSON.parse(favorites) : [];
};
