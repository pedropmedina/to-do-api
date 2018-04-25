// require config
require('./config/config.js');

// require express, ObjectId
const express = require('express');
const { ObjectId } = require('mongodb');

// require db/mongoose
const { mongoose } = require('./db/mongoose');

// bring in the models
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

// intialize express
const app = express();

// define port and assign process.env.PORT
const port = process.env.PORT;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { authenticate } = require('./middleware/authenticate');

// utils
const { removeAuthor } = require('./utils/removeAuthor');

// --------------------------------
// --------- Todo Routes ----------
// --------------------------------

// POST /todos
app.post('/todos', authenticate, (req, res) => {
	const pick = ({ text, completed, createdAt }) => ({
		text,
		completed,
		createdAt,
		_author: req.user._id,
	});

	const body = pick(req.body);

	const todo = new Todo(body);
	todo
		.save()
		.then(todo => {
			if (!todo) {
				return res.status(400).send();
			}

			res.status(200).send(todo);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// GET /todos
app.get('/todos', authenticate, (req, res) => {
	Todo.find({ _author: req.user._id })
		.then(todos => {
			res.status(200).send(removeAuthor(todos));
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// GET /todos/:id
app.get('/todos/:id', authenticate, (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOne({ _id: id, _author: req.user._id })
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}

			res.status(200).send(todo);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, (req, res) => {
	const id = req.params.id;

	const pick = ({ text, completed, createdAt }) => ({
		text,
		completed,
		createdAt,
	});

	const body = pick(req.body);

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOneAndUpdate(
		{ _id: id, _author: req.user._id },
		{ $set: body },
		{ new: true },
	)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.status(200).send(todo);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// DELETE /todos
app.delete('/todos/:id', authenticate, (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOneAndRemove({ _id: id, _author: req.user._id })
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.status(200).send(todo);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// --------------------------------
// --------- User Routes ----------
// --------------------------------

// POST /users
app.post('/users', (req, res) => {
	const pick = ({ email, password }) => ({ email, password });
	const body = pick(req.body);

	const user = new User(body);

	user
		.save()
		.then(user => {
			return user.generateAuthToken();
		})
		.then(token => {
			res
				.status(200)
				.header('x-auth', token)
				.send(user);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// POST users/login
app.post('/users/login', (req, res) => {
	const pick = ({ email, password }) => ({ email, password });
	const body = pick(req.body);

	User.findByCredentials(body.email, body.password)
		.then(user => {
			user.generateAuthToken().then(token => {
				res
					.status(200)
					.header('x-auth', token)
					.send(user);
			});
		})
		.catch(err => {
			res.status(400).send();
		});
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// DELETE /users/me/token --> use when logging out
app.delete('/users/me/token', authenticate, (req, res) => {
	req.user
		.removeToken(req.token)
		.then(() => {
			res.status(200).send();
		})
		.catch(err => {
			res.status(400).send();
		});
});

// start server
app.listen(port, () => {
	console.log(`App served on port ${port}.`);
});
