export const parseQuery = (query: string) => {
  const ids = [] as Array<string>;
  const parsedQuery = {} as { [key: string]: any };
  console.log(query?.split('&'));
  query?.split('&').forEach((value) => {
    const [key, item] = value.split('=');
    if (key === 'ids[]') {
      ids.push(item);
      parsedQuery.ids = ids;
    } else {
      parsedQuery[key] = item;
    }
  });
  return parsedQuery;
};
