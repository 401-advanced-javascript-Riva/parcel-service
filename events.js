'use strict';
//Global Event Pool (shared by all modules)

const EventEmitter = require('events');
const driver = require('./driver');

//create class that has all capabilities of event emitter
class Logger extends EventEmitter {
        log(message) {
        console.log(message);
        //raising an event in this class, now I can raise many events
        this.emit('pickup', {});
        this.emit('in-transit');
        this.emit('delivered');
    }
   
}
// class Event extends EventEmitter {
//     constructor(interval) {
//         this.interval = 5000;
//     }
//     setInterval() {
//         const timer = setinterval(() => {
//             this.emit('pickup', this.interval);
//         })
//     }
// }
module.exports = Logger;

