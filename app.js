const express = require('express');
const app = express();
/**
 * Morgan is used to output the
 * data of the requests
 */
const morgan = require('morgan');

/**
 * This productRoutes is basically "router" of that products endpoint
 * because this is what we actually exported from there. Using module.exports
 */
const productRoutes = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');

/**
 *  A middleware that is called whenever a route(if given) is triggered
 * Other wise it is called for all the routes, no matter what
 */

/**
 * If we use morgan after any of the below
 * It will just not be able to catch requests of
 * the prefixes above it.
 */
app.use(morgan('dev'));
/**
 * Next is not called in the below two routes (eg: in the function productRoutes )
 * Therefore nothing comes out from there and just
 * stays in there
 */
app.use('/products', productRoutes);
app.use('/orders', ordersRoute);
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 400;
	next(error);
});

/**
 * If you pass anything to the next() function (except the string 'route'),
 * Express regards the current request as being an error and will skip any remaining
 * non-error handling routing and middleware functions.
 */
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
