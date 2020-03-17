/** @function SimpleServer
 * @description Creates Server based on Configuration.
 * @param {Object} config - Configuration to create Server (PORT, HOST, SSL).
 * @returns {Server} Created Server.
 */
function SimpleServer(config = { PORT: 3000, HOST: '127.0.0.1' }) {

    // Create Server
    const server = config.SSL
        ? require('https').createServer({
            key: require('fs').readFileSync(`${config.SSL}.key`),
            cert: require('fs').readFileSync(`${config.SSL}.cert`)
        })
        : require('http').createServer();

    // Assign Configuration
    server.config = config;

    // Run Server
    server.run = () => {
        server.listen(parseInt(server.config.PORT), server.config.HOST);
        server.on('listening', () => {
            const { address, port } = server.address();
            const http = `http${server.config.SSL ? 's' : ''}`;
            console.log(`Listening at ${http}://${address}:${port}`);
        });
        server.on('error', error => { throw error; });
        return server;
    };

    // Return Server
    return server;

}
module.exports = SimpleServer;
