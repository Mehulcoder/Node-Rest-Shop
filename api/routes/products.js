const express = require('express');
const mongoose = require('mongoose');
const { update } = require('../models/product');
const Product = require('../models/product');
const router = express.Router();

//
// ─── THIS WILL GIVE US ALL THE PRODUCTS THAT ARE IN THE DATATBASE ───────────────
//

router.get('/', (req, res, next) => {
	Product.find()
		.select('name price _id')
		.exec()
		.then((doc) => {
			const response = {
				count: doc.length,
				products: doc.map((elem) => {
					return {
						name: elem.name,
						price: elem.price,
						request: {
							type: 'GET',
							url: `http://localhost:3000/products/${elem._id}`,
						},
					};
				}),
			};

			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── THIS WILL ADD A PRODUCT TO THE DATABASE ────────────────────────────────────
//

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
			const response = {
				name: prod.name,
				price: prod.price,
				id: prod._id,
			};
			res.status(200).json({
				message: 'Successfully created a new product',
				createdProduct: response,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── THIS IS USED TO GET A PRODUCT WITH A GIVEN ID ──────────────────────────────
//

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
		.select('name price _id')
		.exec()
		.then((doc) => {
			if (doc != null) {
				res.status(200).json({
					product: doc,
					request: {
						type: 'GET',
						description: 'Get all products',
						url: `http://localhost:3000/products`,
					},
				});
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

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── THIS IS USED TO UPDATE A PRODUCT ALREADY IN THE DATABASE ───────────────────
//

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;

	const updateOps = {};
	for (const key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			const element = req.body[key];
			updateOps[key] = element;
		}
	}

	Product.update(
		{ _id: id },
		{
			$set: updateOps,
		},
	)
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── THIS IS USED TO DELETE DATA ────────────────────────────────────────────────
//

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.remove({ _id: id })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'Product deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/products',
					body: {
						name: 'String',
						price: 'Number',
					},
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;
