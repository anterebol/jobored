export const isActiveLink = ([path, currentPath]: Array<string>) =>
  path.includes(currentPath) ? 'active' : '';
