const connection = require('./connection');

class UserCrud {

    /**
     * @param {Connection} connection
     */
    constructor(connection) {
        this.connect = connection.getConnection();
    }

    /**
     * @return {Promise<Collection>}
     */
    async _getUsersDb() {
        if (this.usersDB) {
            return this.usersDB;
        }
        const connect = await this.connect;
        const db = connect.db('test_1');
        this.usersDB = db.createCollection('users');
        return this.usersDB;
    }

    /**
     * @param {object} user
     * @return {Promise<Boolean>}
     */
    async create(user) {
        return (await this._getUsersDb()).insertOne(user);
    }

    /**
     * @param {object} user
     * @param {Number} id
     * @return {Promise<Boolean>}
     */
    async update(id, user) {
        return (await this._getUsersDb()).updateOne({_id: id}, {'$set': user}, {multi:true});
    }

    /**
     * @param {Number} id
     * @return {Promise<object>}
     */
    async getUser(id) {
        return (await this._getUsersDb()).findOne({_id: id});
    }

    /**
     * @return {Promise<Boolean>}
     */
    async delete(id) {
        return (await this._getUsersDb()).deleteOne({_id: id})
    }

    /**
     * @return {Promise<[object]>}
     */
    async getUsers() {
        return (await this._getUsersDb()).find().toArray();
    }
}


class Singleton {
    constructor() {
        if (!this.instance) {
            this.instance = new UserCrud(connection)
        }
    }
}

module.exports = new Singleton().instance;