'use strict';
/*
- Manages the state of every package (ready for pickup, in transit, delivered, etc)
- Logs every event to the console with a timestamp and the event payload
i.e. “EVENT {}”
*/

require('./driver');
require('./vendor');
const logger = require('./events');

function logWithTimeStamp(message, payload) {
    const now = new Date();
    logger.log(now.toTimeString() + ' EVENT ' + message, payload);
}
logger.on('pickup', order => {
   logWithTimeStamp('pickup', order);
});

logger.on('in-transit', order => {
    logWithTimeStamp('in-transit', order);
 });

 logger.on('delivered', order => {
    logWithTimeStamp('delivered', order);
 });
