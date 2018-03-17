const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');
const SocketConnectionHandler = require('./SocketConnectionHandler.js');

module.exports = function () {

    let server;

    return {
        start
    };

    function start() {
        initServer();
        initSocketIO();
    }

    function initServer() {
        server = http.createServer(handleServerConnection);
        server.listen(3000);
    }

    function initSocketIO() {
        io = SocketIO(server);
        io.on('connection', SocketConnectionHandler);
    }

    async function handleServerConnection(req, res) {
        let parsedUrl = url.parse(req.url, true);
        if (parsedUrl.path === '/') {
            let content = await readFile(path.join(__dirname, 'index.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
        else if (parsedUrl.path === '/clientScript.js') {
            let content = await readFile(path.join(__dirname, 'clientScript.js'));
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
        }
        else {
            res.end();
        }
    }
};

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, file) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(file);
            }
        });
    });
}