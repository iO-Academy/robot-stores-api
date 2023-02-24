const { getProducts, postProducts, getProduct } = require('../controllers/productsControllers')

const routes = (app) => {
  // Associate controllers with routes
  app.get('/products', getProducts);
  app.post('/products', postProducts);
  app.get('/products/:id', getProduct);
}


module.exports = routes;
