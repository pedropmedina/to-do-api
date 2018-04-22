// require mongoose
const mongoose = require('mongoose');

// set mongoose's promise to use global.promise
mongoose.Promise = global.Promise;

// connect mongoose to MONGODB_URI, environment provided by Mlabs
mongoose.connect(process.env.MONGODB_URI);

// export mongoose
module.exports = { mongoose };
