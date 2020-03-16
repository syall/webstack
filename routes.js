class SimpleRouter {

    constructor(server) {
        this.server = server;
        this.server.routes = [];
        this.server._server.on('request', (req, res) => {
            for (const [pattern, fn] of this.server.routes)
                if (pattern.exec(req.url))
                    return fn(req, res);
        });
    }

    add(r, handler) {
        const regex = new RegExp(r);
        this.server.routes.push([regex, handler]);
    }

}
module.exports = SimpleRouter;
