'use strict';
/*
- Declare your store name (perhaps in a .env file, so that this module is re-usable)
- Every 5 seconds, simulate a new customer order
- Create a fake order, as an object:
 storeName, orderId, customerName, address
- Emit a ‘pickup’ event and attach the fake order as payload
- Monitor the system for events …
    - Whenever the ‘delivered’ event occurs, Log “thank you” to the console
    */
const EventEmitter = require('events');
setInterval(() => {
    logger.emit();
}, 1000);
