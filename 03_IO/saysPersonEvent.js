const {EventEmitter} = require('events');

class SaysEvent extends EventEmitter {

    /**
     * @param {Person} person
     * @param {String} message
     */
    setSpeaker(person, message) {
        this.on('says', () => person.speaks(message))
    }

}

module.exports = SaysEvent;