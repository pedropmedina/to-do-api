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
