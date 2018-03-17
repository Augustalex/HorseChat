const horsify = require('./horsify.js');

module.exports = function (connection) {

    connection.on('message', handleChatMessage);

    async function handleChatMessage({ message, clientId }) {
        let horseMessage = await horsify(message);
        connection.broadcast.emit('message', { message: horseMessage, clientId });
    }
};