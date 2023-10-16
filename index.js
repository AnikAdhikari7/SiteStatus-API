/*
Title: SiteStatus-API
Description: A RESTFul API to monitor up or down time of user defined links
Author: Anik Adhikari
Date: 11/10/2023
*/

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// data.delete('test', 'newFile', (err) => {
//     console.log('Error:', err);
// });

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
