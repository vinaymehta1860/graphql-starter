const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let Person = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	age: { type: Number },
	occupation: { type: String },
	company: { type: String }
});

module.exports = mongoose.model('Person', Person);
