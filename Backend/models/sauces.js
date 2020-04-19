const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
	name: {type: String, required: true},
	imageUrl: {type: String, required: true},
	manufacturer: {type: String, required: true},
	heat: {type: Number, required: true},
	description: {type: String, required: true},
	mainPepper: {type: String, required: true},
	likes: {type: Number},
	dislikes: {type: Number},
	usersliked: {type:[String]},
	usersdisliked: {type:[String]},
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('sauce', sauceSchema);  