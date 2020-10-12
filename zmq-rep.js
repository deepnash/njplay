'use strict';
const fs = require('fs');
const zmq = require('zeromq');
const { SIGINT } = require('constants');

const responder = zmq.socket('rep');

responder.on('message', data => {
    const request = JSON.parse(data);
    console.log(`Received request to get: ${request.path}`);
    responder.send(JSON.stringify({
        timestamp: Date.now(),
        pid: process.pid
    }));
});

responder.bind('tcp://127.0.0.1:60401', err => {
    if (err !== undefined) {
        console.log("Got error: ", err);
    } else {
        console.log('Listening for zmq requesters ...');
    }
});

process.on(SIGINT, () => {
    console.log("Shutting down..");
    responder.close();
});
