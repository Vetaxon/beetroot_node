class Person {
    
    /**
     * @param {String} name 
     * @param {String} address
     */
    constructor(name = '', address = ''){
        this._name = name;
        this._address = address;
    }

    /** 
     * @returns {String} 
     */
    getInfo() {
        return `${this._name} ${this._address}`;
    }
}


module.exports = Person;