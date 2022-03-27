export const getKeysFromAnyObject = (object: any): any[] => {
  try {
    return Object.keys(object);
  } catch (error) {
    return [];
  }
};
