const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({
		message: 'Handling GET requests to /orders',
	});
	// next();
});

router.post('/', (req, res, next) => {
	res.json({
		message: 'Handling POST requests to /orders',
	});
});

module.exports = router;
