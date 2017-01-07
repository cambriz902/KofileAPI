const orders = require('express').Router();

/* Orders Routes */
const prices = require('./prices');
const funds_distribution = require('./funds_distribution');


orders.post('/prices', prices);
orders.post('/funds_distribution', funds_distribution);


module.exports = orders;
