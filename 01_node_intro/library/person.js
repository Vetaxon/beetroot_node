class Person {
    
    /**
     * @param {String} name 
     * @param {String} city 
     */
    constructor(name = '', city = ''){
        this._name = name;
        this._city = city;
    }

    /** 
     * @returns {String} 
     */
    getUserDetails() {
        return `${this._name} ${this._city}`;
    }
}


module.exports = Person;