const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/**
 * Morgan is used to output the
 * data of the requests
 */
const morgan = require('morgan');

/**
 * We will setup the default mongoose connection below
 */

const url = 'mongodb://127.0.0.1/shop-database';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connction error: '));

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Now we want to tell the client that yeah you can have access
 * to the data even if you are on different host
 * For that we attach a header. We prevent CORS errors
 */

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', '*');
// 	if (req.method === 'OPTIONS') {
// 		res.header(
// 			'Access-Control-Allow-Methods',
// 			'PUT, POST, PATCH, GET, DELETE',
// 		);
// 		return res.status(200).json({});
// 	}
// });

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
