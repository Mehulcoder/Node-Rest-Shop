const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({
		message: 'Handling GET requests to /orders',
	});
	// next();
});

router.post('/', (req, res, next) => {
	const createdOrder = {
		productID: req.body.productID,
		quantity: req.body.quantity,
	};
	res.json({
		message: 'Handling POST requests to /orders',
		createdOrder,
	});
});

module.exports = router;
