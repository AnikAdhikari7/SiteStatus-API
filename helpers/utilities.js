const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

// parse into JSON
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// string to hash
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto
            .createHmac('sha256', environments.secretKey)
            .update(str)
            .digest('hex');
        return hash;
    }
    return false;
};

// generate random string
utilities.createRandomString = (len) => {
    const length = typeof(len) === 'number' && len > 0 ? len : 20;

    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';

    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += chars.charAt(Math.floor((Math.random() * chars.length)));
    }

    return randomString;
};

module.exports = utilities;
