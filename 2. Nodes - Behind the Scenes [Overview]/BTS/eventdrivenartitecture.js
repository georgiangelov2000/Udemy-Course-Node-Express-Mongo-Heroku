let events = require('events');

//Createing an event emitter
let eventEmitter = new events.EventEmitter();


// this is the event listener
eventEmitter.on('connection', () => {
    console.log('Connection successfull.');
})

//firing the connection event
eventEmitter.emit('connection');