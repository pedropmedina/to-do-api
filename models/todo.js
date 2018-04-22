// require mongoose
const mongoose = require('mongoose');

// get Schema from mongoose
const { Schema } = mongoose;

// create Schema
const todoSchema = new Schema({
	text: {
		type: String,
		required: true,
		minlength: 1,
	},
	completed: {
		type: Boolean,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	_author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

// create model from schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
