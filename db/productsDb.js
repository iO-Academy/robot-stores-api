const dbService = require('../services/dbService');

// let dbConnection = null;
//
// dbService.connectToDB()
//   .then(db => dbConnection = db)
//   .catch(error => {
//     throw new Error('Error connecting to DB.\n' + error.message)
//   });

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
  console.log('db.productsDb.getProducts()');

  try {
    // const productsCollection = await dbConnection.collection('products');

    let query = {};
    if (categories.length > 0) {
      query.category = {$in: categories};
    }
    if (characters.length > 0) {
      query.character = {$in: characters};
    }
    console.log(query);

    return await productsCollection.find(query).toArray();
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

const getProduct = async (id) => {
  console.log('db.productsDb.getProduct()');

  let query = { id: id };

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
    return await productsCollection.distinct('id');
  } catch (e) {
    throw new Error('Unexpected error');
  }
}

module.exports = {
  getProducts,
  getProduct,
  getAllCategories,
  getAllCharacters,
  getAllIds
}
