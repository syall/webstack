class SimpleRouter {

    constructor(server) {
        this.server = server._server;
        this.middle = [];
        this.routes = [];
        this.server.on('request', async (req, res) => {
            for (const mw of this.middle)
                mw(req, res);
            for (const [regex, handler] of this.routes)
                if (regex.exec(req.url))
                    handler(req, res);
        });
    }

    add(r, handler) {
        this.routes.push([new RegExp(r), handler]);
    }

    use(mw) {
        this.middle.push(mw);
    }

}
module.exports = SimpleRouter;
