const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const router = express.Router();
router.get('/', (req, res, next) => {
	Product.find()
		.exec()
		.then((doc) => {
			console.log(doc);
			res.status(200).json({
				message: 'Handling GET requests to /products',
				doc,
			});
		});
});

router.post('/', (req, res, next) => {
	const createdProduct = {
		name: req.body.name,
		price: req.body.price,
	};
	/**
	 * Store the data in the database
	 */

	console.log(createdProduct);
	const data = new Product({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	});
	data.save()
		.then((prod) => {
			console.log(prod);
			res.status(200).json({
				message: 'Handling POST requests to /products',
				createdProduct: prod,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
		.exec()
		.then((doc) => {
			console.log(doc);
			if (doc != null) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: 'The given ID not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

module.exports = router;
