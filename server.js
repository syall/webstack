class SimpleServer {

    constructor(config) {
        this._config = config;
        if (this._config.SSL === undefined) {
            this._server = require('http').createServer();
        } else {
            const { readFileSync } = require('fs');
            this._server = require('https').createServer({
                key: readFileSync(`${this._config.SSL}.key`),
                cert: readFileSync(`${this._config.SSL}.cert`)
            });
        }
    }

    run() {
        this._server.listen(parseInt(this._config.PORT), this._config.HOST);
        this._server.on('listening', () => {
            const { address, port } = this._server.address();
            const http = `http${(this._config.SSL && 's') || ''}`;
            console.log(`Listening at ${http}://${address}:${port}`);
        });
        this._server.on('error', error => {
            if (error.code !== 'EADDRINUSE') {
                throw error;
            } else {
                console.error(`${this._config.PORT} is already in use`);
                process.exit(1);
            }
        });
    }

}

module.exports = SimpleServer;
