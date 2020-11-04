# parcel-service
An event-driven application that uses built-in Node.js events to simulate realtime package delivery, networked events using TCP Creation , socket.io implementation, and queue logic

**Author: Riva Davidowski**

### Phase 1:

In this first phase, I setup a system of events and handlers, with the intent being to change out the eventing system as I go, but keeping the handlers themselves largely the same. The task of “delivering a package” doesn’t change (the handler), even if the mechanism for triggering that task (the event) does.

### Phase 2: 

In Phase 2, I spread the functionality of the application into multiple applications, so that users on different computers and connections can continue to communicate in real time as packages are prepared, picked up, and delivered.

The core functionality I've built remains the same. The difference in this phase is I use multiple applications to raise and listen for the events. Here the major difference in how I deal with the events.

### Installing:
- `npm i @code-fellows supergoose`
- `npm i faker` for faking data
- `npm i dotenv` for holding store name so I can easily pass it around
- load the `net` module: `const net = require('net`):
  
### dotenv Requirements:

STORE_NAME=
  
## Using parcel-service:

- For the first phase, running Node.js in the console and an understanding of the `EventEmitter` class was needed. You can read more about EventEmitter [here](https://nodejs.org/api/events.html#events_asynchronous_vs_synchronous). I created an instance of the EventEmitter class rather than using it alone so that I wouldn't have to create a separate event emitter object to emit events.
- To start the program, run `node caps.js`



## UML:

**Phase 1**

![UML](UML.png);

**Phase 2**

![UML](netSocket.png)
