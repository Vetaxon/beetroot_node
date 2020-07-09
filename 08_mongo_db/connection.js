const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb+srv://vi:Pass@2210@cluster0.m7fi3.mongodb.net/test_1?retryWrites=true&w=majority';

class Connection {

    constructor(path) {
        this.path = path;
    }

    getConnection() {
        return mongoClient.connect(this.path, { useUnifiedTopology: true });
    }

    getMongooseConnection() {
        return mongoose.connect(this.path, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}

class Singleton {
    constructor() {
       if (!this.instance) {
           this.instance = new Connection(url)
       }
    }
}

module.exports = new Singleton().instance;