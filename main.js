const Server = require('./server');

(async function () {
    let server = Server();
    await server.start();
}());