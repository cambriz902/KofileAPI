const routes = require('express').Router();
const orders = require('./orders');

routes.use('/orders', orders);

routes.get('/', (req, res) => {
  res.status(200).json('Connected!');
});

module.exports = routes;
