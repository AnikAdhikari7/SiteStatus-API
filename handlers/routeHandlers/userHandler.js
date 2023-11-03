const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { user } = require("../../routes");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");

const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === "string" &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;
    const lastName =
        typeof requestProperties.body.lastName === "string" &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;
    const phone =
        typeof requestProperties.body.phone === "string" &&
        requestProperties.body.phone.trim().length === 10
            ? requestProperties.body.phone
            : false;
    const password =
        typeof requestProperties.body.password === "string" &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;
    const tosAgreement =
        typeof requestProperties.body.tosAgreement === "boolean"
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read("users", phone, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                data.create("users", phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: "User was created succesfully!",
                        });
                    } else {
                        callback(500, { error: "Could not create user!" });
                    }
                });
            } else {
                callback(500, {
                    Error: "There was a problem in the server side...",
                });
            }
        });
    } else {
        callback(400, {
            error: "You have a problem in your request",
        });
    }
};
handler._users.get = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.queryStringObject.phone === "string" &&
        requestProperties.queryStringObject.phone.trim().length === 10
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        // verify token
        const token =
            typeof requestProperties.headersObject.token === "string"
                ? requestProperties.headersObject.token
                : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // lookup the user
                data.read("users", phone, (err, u) => {
                    const user = { ...parseJSON(u) };
                    if (!err && user) {
                        delete user.password;
                        callback(200, { user });
                    } else {
                        callback(404, {
                            error: "Requested user was not found!",
                        });
                    }
                });
            } else {
                callback(403, { error: "Authentication failure..." });
            }
        });
    } else {
        callback(400, {
            error: "You have a problem in your request",
        });
    }
};
handler._users.put = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === "string" &&
        requestProperties.body.phone.trim().length === 10
            ? requestProperties.body.phone
            : false;

    const firstName =
        typeof requestProperties.body.firstName === "string" &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;
    const lastName =
        typeof requestProperties.body.lastName === "string" &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;
    const password =
        typeof requestProperties.body.password === "string" &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone) {
        // verify token
        const token =
            typeof requestProperties.headersObject.token === "string"
                ? requestProperties.headersObject.token
                : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                //lookup the user
                if (firstName || lastName || password) {
                    data.read("users", phone, (err, uData) => {
                        const userData = { ...parseJSON(uData) };
                        if (!err && uData) {
                            if (firstName) userData.firstName = firstName;
                            if (lastName) userData.lastName = lastName;
                            if (password) userData.password = hash(password);

                            data.update("users", phone, userData, (err) => {
                                if (!err) {
                                    callback(200, {
                                        message:
                                            "User was updated successfully!",
                                    });
                                } else {
                                    callback(500, {
                                        error: "There was a problem in the server side!",
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                error: "You have a problem in your request...",
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: "You have a problem in your request...",
                    });
                }
            } else {
                callback(403, { error: "Authentication failure..." });
            }
        });
    } else {
        callback(400, { error: "Invalid phone number, please try again..." });
    }
};
handler._users.delete = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.queryStringObject.phone === "string" &&
        requestProperties.queryStringObject.phone.trim().length === 10
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        // verify token
        const token =
            typeof requestProperties.headersObject.token === "string"
                ? requestProperties.headersObject.token
                : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // lookup the user
                data.read("users", phone, (err, userData) => {
                    if (!err && userData) {
                        data.delete("users", phone, (err) => {
                            if (!err) {
                                callback(200, {
                                    message: "User was successfully deleted!",
                                });
                            } else {
                                callback(500, {
                                    error: "There was a server side error...",
                                });
                            }
                        });
                    } else {
                        callback(500, {
                            error: "There was a server side error...",
                        });
                    }
                });
            } else {
                callback(403, { error: "Authentication failure..." });
            }
        });
    } else {
        callback(400, { error: "There was a problem in your request..." });
    }
};
module.exports = handler;
