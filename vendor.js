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

const faker = require('faker');
// const storeName = process.env.STORE_NAME;
const logger = require('./events');

let id = 1;
const fakeOrders = () => {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let address = faker.address.city();
      let state = faker.address.state();
      const order = {
          "storeName": 'Caps',
          "id": id,
          "first_name": firstName,
          "last_name": lastName,
          "address": address,
          "state" : state
      };
      id++;
    logger.log('new order ready for pick up ', order)
    logger.emit('pickup', order);
}
logger.on('delivered', (order) =>  {
    logger.log(`Thank you  ${order.first_name}`);
})

setInterval(fakeOrders, 5000);


