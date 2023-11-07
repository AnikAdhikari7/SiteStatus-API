const environments = {};

environments.staging = {
    port: 3000,
    envName: "staging",
    secretKey: "jhkfkhfkahkljhksjha",
    maxChecks: 5,
    twilio: {
        fromPhone: "+1500555006",
        accountSid: "ACb5358bd7bfb7b10c3c4ec1f616ac80b6",
        authToken: "5f342b4cba72a57680992e8908f8b6db",
    },
};
environments.production = {
    port: 5000,
    envName: "production",
    secretKey: "iehrfjerhfhfiojkhf",
    maxChecks: 5,
    twilio: {
        fromPhone: "+1500555006",
        accountSid: "ACb5358bd7bfb7b10c3c4ec1f616ac80b6",
        authToken: "5f342b4cba72a57680992e8908f8b6db",
    },
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === "object"
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
