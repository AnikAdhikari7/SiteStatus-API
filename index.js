/*
Title: SiteStatus-API
Description: A RESTFul API to monitor up or down time of user defined links
Author: Anik Adhikari
Date: 11/10/2023
*/

// dependencies
const server = require("./lib/server");
const worker = require("./lib/worker");

// app object - module scaffolding
const app = {};

app.init = () => {
    // start the server
    server.init();

    // start the workers
    worker.init();
};

app.init();

// export the app
module.exports = app;

// -----------------------------------------------------------------------------------------
// intial code
/*
Title: SiteStatus-API
Description: A RESTFul API to monitor up or down time of user defined links
Author: Anik Adhikari
Date: 11/10/2023


// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
// const { sendTwilioSms } = require("./helpers/notifications");

// app object - module scaffolding
const app = {};

// // TODO delete later
// sendTwilioSms("9749946845", "ayoh anik", (err) => {
//     console.log(`This is the error:`, err);
// });

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
*/
