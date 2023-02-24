const { getProducts, getProduct } = require('../controllers/productsControllers')

const routes = (app) => {
  // Associate controllers with routes
  app.get('/products', getProducts);
  app.get('/products/:id', getProduct);
}


module.exports = routes;
