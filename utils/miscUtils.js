/**
 * Convert a comma-separated list of values derived from a query string to an array.
 *
 * @param value
 * @returns {string[]|[]}
 */
const stringValuesToArray = (value) => {
  if (value && typeof value === 'string') {
    return  value.split(',');
  }
  return [];
}

module.exports = {
  stringValuesToArray
}
