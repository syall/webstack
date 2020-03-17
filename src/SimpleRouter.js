class SimpleRouter {

    constructor(server) {
        this.server = server._server;
        this.middle = [];
        this.routes = [];
        this.server.on('request', async (req, res) => {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', _ => {
                if (data.length !== 0)
                    req.data = data;
                for (const [regex, handler] of this.routes)
                    if (regex.exec(req.url))
                        handler(req, res);
            });
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
