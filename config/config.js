// set process.env.NODE_ENV
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
	const config = require('./config.json');
	const envConfig = config[env];

	Object.keys(envConfig).forEach(key => {
		process.env[key] = envConfig[key];
	});
}

/*

// check for either development or test environment
if (env === 'development') {
	// set the PORT
	process.env.PORT = 3001;
	// set MONGODB_URI
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
	// set the PORT
	process.env.PORT = 3001;
	// set MONGODB_URI
	process.env.MONGO_URI = 'mongodb://localhost:27017/TodoAppTest';
}

*/
