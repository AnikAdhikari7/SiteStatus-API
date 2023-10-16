const handle = {};

handle.notFoundHandler = (requestProperties, callback) => {
    console.log('Not Found');

    callback(404, {
        message: 'your requested url was not found',
    });
};

module.exports = handle;
