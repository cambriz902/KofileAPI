const orders = require('express').Router();
const prices = require('./prices');
const funds_distribution = require('./funds_distribution');

/* Order Routes */
orders.post('/prices', prices);
orders.post('/funds_distribution', funds_distribution);

module.exports = orders;
