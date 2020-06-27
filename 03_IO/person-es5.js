function Person(name) {
    this.name = name;
}
Person.prototype.speaks = message => console.log(message);

module.exports = Person;