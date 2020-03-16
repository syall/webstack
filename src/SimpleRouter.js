class SimpleRouter {

    constructor(server) {
        this.server = server;
        this.middle = [];
        this.server.routes = [];
        this.server._server.on('request', (req, res) => {
            for (const mw of this.middle)
                mw(req, res);
            for (const [pattern, fn] of this.server.routes)
                if (pattern.exec(req.url))
                    return fn(req, res);
        });
    }

    add(r, handler) {
        this.server.routes.push([new RegExp(r), handler]);
    }

    use(mw) {
        this.middle.push(mw);
    }

}
module.exports = SimpleRouter;
