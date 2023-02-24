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
  validCategories,
  validCharacters,
  validIdStr,
  validId
}
