const {Person} = require('./library/library');

console.log((new Person('Hello', 'Kharkiv')).getInfo());
console.log((new Person('Hi', 'Kyiv')).getInfo());