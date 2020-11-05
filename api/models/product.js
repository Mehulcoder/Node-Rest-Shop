//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: [true, 'name is a required field'],
	},
	price: {
		type: Number,
		required: [true, 'price is a required field'],
	},
});

/**
 * This compiles our model, and the name 'Product'
 * will be used in the places where it is imported
 */
module.exports = mongoose.model('Product', productSchema);
