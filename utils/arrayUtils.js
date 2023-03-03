/**
 * Check whether one array is a subset of another array.
 *
 * @param miscArray The array to check.
 * @param parent The parent array.
 * @returns {boolean} True if miscArray is a subset of parent, false otherwise.
 */
const isSubsetOf = (miscArray, parent) => {
  return miscArray.every((el) => {
    return parent.includes(el)
  })
}

module.exports = {
  isSubsetOf
}
