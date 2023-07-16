function success(message, data) {
    console.log()
    return {
        status: 200,
        message,
        data,
    };
}

function errorClient(message) {
    return {
        status: 400,
        message,
    };
}

function errorServer(message) {
    return {
        status: 500,
        message,
    };
}

module.exports = {
    success,
    errorClient,
    errorServer,
};