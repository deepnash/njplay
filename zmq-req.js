'use strict';

const zmq = require('zeromq');
const readline = require('readline');
const filename = process.argv[2];

console.log("filename :", filename);

const requester = zmq.socket('req');

requester.on('message', data => {
    const response = JSON.parse(data);
    console.log('Received response: ', response);
});

requester.connect('tcp://localhost:60401');

console.log(`Sending a request for ${filename}`);
for (let i = 1; i <= 10; i++) {
    console.log(`Sending request number ${i}`);
    requester.send(JSON.stringify({ path: filename }));
}