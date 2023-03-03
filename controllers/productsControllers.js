const productsService = require('../services/productsService');
const errors = require('../utils/errors');
const { stringValuesToArray } = require('../utils/miscUtils');

const getProducts = async (req, res) => {
  const categories = stringValuesToArray(req.query.categories);
  const characters = stringValuesToArray(req.query.characters);

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

const postProducts = async (req, res) => {
  const newProduct = req.body;

  let status = 201;
  const obj = {
    message: ''
  };

  try {
    const product = await productsService.postProducts(newProduct);
    obj.message = "Successfully created product.";
  } catch (error) {
    obj.message = error.message;
    obj.data = [];
    if (error instanceof errors.ValidationError) {
      status = 400;
    } else {
      status = 500;
    }
  }

  res.status(status).json(obj);
}

const getProduct = async (req, res) => {
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

const getCategories = async (req, res) => {
  let status = 200;
  const obj = {
    message: '',
    data: []
  };

  try {
    const categories = await productsService.getCategories();
    obj.message = "Successfully found categories.";
    obj.data = categories;
  } catch (error) {
    obj.message = error.message;
    status = 500;
  }

  res.status(status).json(obj);
}

const getCharacters = async (req, res) => {
  let status = 200;
  const obj = {
    message: '',
    data: []
  };

  try {
    const characters = await productsService.getCharacters();
    obj.message = "Successfully found characters.";
    obj.data = characters;
  } catch (error) {
    obj.message = error.message;
    status = 500;
  }

  res.status(status).json(obj);
}

module.exports = {
  getProducts,
  postProducts,
  getProduct,
  getCategories,
  getCharacters
}
