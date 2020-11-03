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
const storeName = process.env.STORE_NAME;
const EventEmitter = require('events');

function generateUsers() {
  let users = []
  for (let id=1; id <= 5; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let address = faker.address.city();
    let state = faker.address.state();
    users.push({
        "storeName": storeName,
        "orderid": id,
        "first_name": firstName,
        "last_name": lastName,
        "address": address,
        "state" : state
    });
  }
  return users;
}
generateUsers();



