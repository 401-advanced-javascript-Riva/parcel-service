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

const logger = require('./events');
// using currentORder to store order that is being delivered so it doesn't have to be passed back and forth between every event
let currentOrder;

//registering listeners for events
logger.on('pickup', (order)  => {
    currentOrder = order;
    setTimeout(inTransit, 1000);
});
const inTransit = () => {
    logger.log('DRIVER: picked up ' + currentOrder.id);
    logger.emit('in-transit', currentOrder);
    setTimeout(isDelivered, 3000);
}
const isDelivered = () => {
    //emitting entire order
    logger.emit('delivered ', currentOrder)
    logger.log('delivered ' + currentOrder.id);
    
}

