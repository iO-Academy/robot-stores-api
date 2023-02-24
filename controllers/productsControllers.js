const productsService = require('../services/productsService');
const errors = require('../utils/errors');
const { stringValuesToArray } = require('../utils/miscUtils');

const getProducts = async (req, res) => {
  console.log('controllers.productsController.getProducts()');

  const categories = stringValuesToArray(req.query.categories);
  const characters = stringValuesToArray(req.query.characters);
  // console.log('Query string:');
  // console.log('categories');
  // console.table(categories);
  // console.log('characters');
  // console.table(characters);

  let status = 200;
  const obj = {
    message: '',
    data: []
  };

  try {
    const products = await productsService.getProducts(categories, characters);
    obj.message = "Successfully found products.";
    obj.data = products;
  } catch (error) {
    obj.message = error.message;
    if (error instanceof errors.ValidationError) {
      status = 400;
    } else {
      status = 500;
    }
  }

  res.status(status).json(obj);
}

const getProduct = async (req, res) => {
  console.log('controller.productsControllers.getProduct()');

  const id = req.params.id;

  let status = 200;
  const obj = {
    message: '',
    data: []
  };

  try {
    const product = await productsService.getProduct(id);
    obj.message = "Successfully found product.";
    obj.data = product;
  } catch (error) {
    obj.message = error.message;
    if (error instanceof errors.ValidationError) {
      status = 400;
    } else {
      status = 500;
    }
  }

  res.status(status).json(obj);
}

module.exports = {
  getProducts,
  getProduct
}
