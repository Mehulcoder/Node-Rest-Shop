const express = require('express');
const app = express();

/**
 *  A middleware that is called whenever a route(if given) is triggered
 * Other wise it is called for all the routes, no matter what
 */

const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);

module.exports = app;
