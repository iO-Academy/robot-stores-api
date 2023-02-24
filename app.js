const express = require('express');
const router = require('./config/routes');

const app = express();
const port = 3000;

app.use(express.json());

// Add all routes to app
router(app);

app.listen(port, () => {
  console.log(`robot_stores_api app running. Listening on ${port}.`);
});
