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

const postProducts = async (newProduct) => {
  console.log('services.productsService.postProducts()');

  if (!await validNewProduct(newProduct)) {
    throw new errors.ValidationError('Invalid product data');
  }

  if (!newProduct.id) {
    const maxId = await productsDb.getMaxId();
    newProduct.id = maxId + 1;
  }

  if (!newProduct.category_id) {
    newProduct.category_id = await productsDb.getIdForCategory(newProduct.category);
  }

  if (!newProduct.character_id) {
    newProduct.character_id = await productsDb.getIdForCharacter(newProduct.character);
  }

  if (!newProduct.image2) {
    newProduct.image2 = "NULL";
  }

  if (!newProduct.image3) {
    newProduct.image3 = "NULL";
  }

  return await productsDb.postProducts(newProduct);
}

const getProduct = async (id) => {
  console.log('services.productsService.getProduct()');

  if (id && !await validIdStr(id)) {
    throw new errors.ValidationError('Unknown product ID');
  }

  return await productsDb.getProduct(Number.parseInt(id));
}

const getCategories = async () => {
  console.log('services.productsService.getCategories()');

  return await productsDb.getAllCategories();
}

/**
 * Check that an array contains a valid set of categories.
 *
 * @param categories The array of categories.
 * @returns {Promise<boolean>}
 */
const validCategories = async (categories) => {
  console.log('services.productsService.validCategories()');

  if (!Array.isArray(categories)) {
    return false;
  }

  const allCategories = await getCategories();

  if (!arrayUtils.isSubsetOf(categories, allCategories)) {
    return false;
  }

  return true;
}

const getCharacters = async () => {
  console.log('services.productsService.getCharacters()');

  return await productsDb.getAllCharacters();
}

/**
 * Check that an array contains a valid set of characters.
 *
 * @param characters The array of characters.
 * @returns {Promise<boolean>}
 */
const validCharacters = async (characters) => {
  if (!Array.isArray(characters)) {
    return false;
  }

  const allCharacters = await getCharacters();

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

const validNewProduct = async (newProduct) => {
  console.log('services.productsService.validNewProduct');

  if (newProduct.id && await validId(newProduct.id)) {
    return false;
  }

  return true;
}

module.exports = {
  getProducts,
  postProducts,
  getProduct,
  getCategories,
  getCharacters,
  validCategories,
  validCharacters,
  validIdStr,
  validId
}
