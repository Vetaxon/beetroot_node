const PersonES5 = require('./person-es5');
const PersonES6 = require('./person-es6');
const SaysPersonEvent = require('./saysPersonEvent');

const bill = new PersonES5('Bill');
const tom = new PersonES6('Tom');
const saysPersonEvent = new SaysPersonEvent();

saysPersonEvent.setSpeaker(bill, 'Hello');
saysPersonEvent.setSpeaker(tom, 'World');

saysPersonEvent.emit('says');