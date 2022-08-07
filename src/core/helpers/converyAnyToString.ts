export const anyToString = (anyItem: unknown): string => {
  try {
    return JSON.stringify(anyItem, null, 2);
  } catch (error) {
    return `${anyItem}`;
  }
};
