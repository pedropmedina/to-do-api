const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: isEmail,
			message: '{VALUE} is not a valid email',
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	tokens: [
		{
			access: {
				type: String,
				required: true,
			},
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// -------------------------------------------
// -------------- Built-in methods------------
// -------------------------------------------

// send to client just the email and id
userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	const pick = ({ _id, email }) => ({ _id, email });
	return pick(userObject);
};

// -------------------------------------------
// --------- Custom Instance Methods ---------
// -------------------------------------------

// generate token
userSchema.methods.generateAuthToken = function() {
	const user = this;
	const access = 'auth';

	const token = jwt
		.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
		.toString();

	user.tokens = [...user.tokens, { access, token }];

	return user.save().then(() => token);
};

// remove token
userSchema.methods.removeToken = function(token) {
	const user = this;

	return user.update({
		$pull: {
			tokens: {
				token,
			},
		},
	});
};

// -------------------------------------------
// ----------- Custom Model Methods ----------
// -------------------------------------------
userSchema.statics.findByCredentials = function(email, password) {
	const User = this;

	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return bcrypt.compare(password, user.password).then(res => {
			if (res !== true) {
				return Promise.reject();
			}
			return user;
		});
	});
};

userSchema.statics.findByToken = function(token) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.access': 'auth',
		'tokens.token': token,
	});
};

// -------------------------------------------
// ---------- Mongoose Middleware ------------
// -------------------------------------------

// encrypt password pre save
userSchema.pre('save', function(next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10).then(salt => {
			bcrypt.hash(user.password, salt).then(hash => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
