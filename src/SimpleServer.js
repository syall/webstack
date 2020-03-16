class SimpleServer {

    constructor(config) {
        this._config = config;
        if (this._config.SSL === undefined) {
            this._server = require('http').createServer();
        } else {
            const { readFileSync } = require('fs');
            const args = {
                key: readFileSync(`${this._config.SSL}.key`),
                cert: readFileSync(`${this._config.SSL}.cert`)
            };
            this._server = require('https').createServer(args);
        }
    }

    run() {
        this._server.listen(parseInt(this._config.PORT), this._config.HOST);
        this._server.on('listening', () => {
            const { address, port } = this._server.address();
            const http = `http${this._config.SSL ? 's' : ''}`;
            console.log(`Listening at ${http}://${address}:${port}`);
        });
        this._server.on('error', error => { throw error; });
    }

    close(fn) {
        this._server.close();
        fn();
    }

}
module.exports = SimpleServer;
