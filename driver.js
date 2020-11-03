'use strict';
/*
This files Monitors the system for events
- On the ‘pickup’ event:
     Wait 1 second
     Log “DRIVER: picked up [ORDER_ID]” to the console.
- Emit an ‘in-transit’ event with the payload you received
     Wait 3 seconds
     Log “delivered” to the console
      Emit a ‘delivered’ event with the same payload
*/

const EventEmitter = require('events');
const Logger = require('./events');
let logger = new Logger();

//registering listeners for events
logger.on('pickup', ()  => {
    console.log('DRIVER: picked up [ORDER_ID]');
});

logger.on('in-transit', ()  => {
    console.log('{}');
})

logger.on('delivered', ()  => {
    console.log('delivered');
})

logger.log('message');
