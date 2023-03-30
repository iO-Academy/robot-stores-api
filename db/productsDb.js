const dbService = require('../services/dbService');
const {ObjectId} = require("mongodb");

let productsCollection = null;

dbService.connectToDB()
  .then((dbConnection) => {
    productsCollection = dbConnection.collection('products');
  })
  .catch(error => {
    throw new Error('Error connecting to DB.\n' + error.message)
  });

/**
 * Fetch all products.
 *
 * @param categories An array of category values.
 * @param characters An array of character values.
 * @returns {Promise<Array>} An array of products.
 */
const getProducts = async (categories = [], characters = []) => {
  try {
    let query = {};
    if (categories.length > 0) {
      query.category = { $in: categories };
    }
    if (characters.length > 0) {
      query.character = { $in: characters };
    }

    return await productsCollection.find(query).toArray();
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

/**
 * Add new product.
 *
 * @param newProduct The product to add.
 * @returns {Promise<_id>}
 */
const postProducts = async (newProduct) => {
  try {
    const result = await productsCollection.insertOne(newProduct);
    return result.insertedId;
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

/**
 * Fetch a single product.
 *
 * @param id The id of the product to fetch.
 * @returns {Promise<{}>} The product.
 */
const getProduct = async (id) => {
  let query = { _id: new ObjectId(id) };

  try {
    return await productsCollection.findOne(query);
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getAllCategories = async () => {
  try {
    return await productsCollection.distinct('category');
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getAllCharacters = async () => {
  try {
    return await productsCollection.distinct('character');
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getAllIds = async () => {
  try {
    return await productsCollection.distinct('_id');
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getMaxId = async () => {
  try {
    const productWithMaxIdArray = await productsCollection
      .find()
      .sort({ id: -1 }) // descending
      .limit(1)
      .toArray();
    return productWithMaxIdArray[0].id;
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getIdForCategory = async (category) => {
  const query = { category: category };
  const options = {
    // Include only the `_id` and `category_id` fields
    projection: { category_id: 1 }
  };
  const categoryIdDoc = await productsCollection.findOne(query, options);

  return categoryIdDoc.category_id;
}

const getIdForCharacter = async (character) => {
  const query = { character: character };
  const options = {
    // Include only the `_id` and `character_id` fields
    projection: { character_id: 1 }
  };
  const characterIdDoc = await productsCollection.findOne(query, options);

  return characterIdDoc.character_id;
}

module.exports = {
  getProducts,
  postProducts,
  getProduct,
  getAllCategories,
  getAllCharacters,
  getAllIds,
  getMaxId,
  getIdForCategory,
  getIdForCharacter
}
