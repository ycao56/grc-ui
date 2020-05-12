/**
 * Shallow compare two arrays for equality
 * @param {Array} arr1 the first array
 * @param {Array} arr2 the second array
 * @returns {boolean} true if both arrays have the same contents, otherwise false
 */
export function equals(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  if (arr1 === arr2) {
    return true;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}