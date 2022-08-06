export const getKeysFromAnyObject = (object: object): string[] => {
  try {
    return Object.keys(object);
  } catch (error) {
    return [];
  }
};
