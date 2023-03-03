const {
  getProducts,
  postProducts,
  getProduct,
  getCategories,
  getCharacters
} = require('../controllers/productsControllers')

const routes = (app) => {
  // Associate controllers with routes
  app.get('/products', getProducts);
  app.post('/products', postProducts);
  app.get('/products/:id', getProduct);
  app.get('/categories', getCategories);
  app.get('/characters', getCharacters);
}


module.exports = routes;
