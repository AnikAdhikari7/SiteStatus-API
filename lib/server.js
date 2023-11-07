/*
Title: SiteStatus-API
Description: A RESTFul API to monitor up or down time of user defined links
Author: Anik Adhikari
Date: 11/10/2023
*/

// dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");

// server object - module scaffolding
const server = {};

server.config = {
    port: 3000,
};

// create server
server.createServer = () => {
    const createServerVar = http.createServer(server.handleReqRes);
    createServerVar.listen(server.config.port, () => {
        console.log(`listening to port ${server.config.port}`);
    });
};

// handle request response
server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
    server.createServer();
};

// export the module
module.exports = server;
