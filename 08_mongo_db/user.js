const mongoose = require('mongoose');
const connection = require('./connection');
const Schema = mongoose.Schema;
connection.getMongooseConnection();

const userSchema = new Schema({
    name: {type: String},
    age: {type: String},
    phones: {type: [String]},
    created_at: {type: Date, default: new Date()}
});

/**
 * {Model} User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;