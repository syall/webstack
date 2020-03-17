/** @function SimpleRouter
 * @description Adds Routing Capabilities to Server.
 * @param {Server} server - Server to add Routing to.
 * @returns {Server} Server with Routing.
 */
function SimpleRouter(server) {

    // Routes
    server.routes = [];

    // Request Listener
    server.on('request', async (req, res) => {
        const data = [];
        req.on('data', chunk => data.push(chunk));
        req.on('end', _ => {
            // Assign Data
            if (data.length !== 0)
                req.data = data;
            // Check Routes
            for (const [regex, handler] of server.routes)
                if (regex.exec(req.url))
                    handler(req, res);
        });
    });

    // Add Route
    server.add = (r, handler) => server.routes.push([
        new RegExp(r),
        handler
    ]);

    // Return Server
    return server;

}
module.exports = SimpleRouter;
