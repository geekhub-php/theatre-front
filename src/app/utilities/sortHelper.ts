export const sortHelper = ({ sortKey }: { sortKey: string }) => ({ [sortKey as keyof Object]: a }, { [sortKey as keyof Object]: b }) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
};
