const express = require('express');
const cors = require('cors');
const router = require('./config/routes');
const errorLogger = require("./middleware/errorLogger");

const app = express();
const port = 3001;

app.use(cors()); // enable all CORS requests
app.use(express.json());

// Add all routes to app
router(app);

// add middleware to all routes
app.use(errorLogger)

app.listen(port, () => {
  console.log(`robot_stores_api app running. Listening on ${port}.`);
});
