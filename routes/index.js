const routes = require('express').Router();
const orders = require('./orders');

routes.use('/orders', orders);

routes.post('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
