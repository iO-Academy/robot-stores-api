const productsDb = require('../db/productsDb');
const arrayUtils = require('../utils/arrayUtils');
const errors = require('../utils/errors');

const getProducts = async (categories, characters) => {
  console.log('services.productsService.getProducts()');

  if (categories && !await validCategories(categories)) {
    throw new errors.ValidationError('Unknown category');
  }

  if (characters && !await validCharacters(characters)) {
    throw new errors.ValidationError('Unknown character');
  }

  return await productsDb.getProducts(categories, characters);
}

const getProduct = async (id) => {
  console.log('services.productsService.getProduct()');

  if (id && !await validIdStr(id)) {
    throw new errors.ValidationError('Unknown product ID');
  }

  return await productsDb.getProduct(Number.parseInt(id));
}

const validCategories = async (categories) => {
  console.log('services.productsService.validCategories()');

  if (!Array.isArray(categories)) {
    return false;
  }

  const allCategories = await productsDb.getAllCategories();

  if (!arrayUtils.isSubsetOf(categories, allCategories)) {
    return false;
  }

  return true;
}

const validCharacters = async (characters) => {
  if (!Array.isArray(characters)) {
    return false;
  }

  const allCharacters = await productsDb.getAllCharacters();

  if (!arrayUtils.isSubsetOf(characters, allCharacters)) {
    return false;
  }

  return true;
}

const validIdStr = async (idStr) => {
  console.log('services.productsService.validIdStr');

  const id = Number.parseInt(idStr);

  if (Number.isNaN(id)) {
    return false;
  }

  return validId(id);
}

const validId = async (id) => {
  console.log('services.productsService.validId');

  let allIds = await productsDb.getAllIds();

  if (!allIds.includes(id)) {
    return false;
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  validCategories,
  validCharacters,
  validIdStr,
  validId
}
