const SimpleServer = require('./server');
const SimpleRouter = require('./routes');
const { handleSignals } = require('./utils');

// Dot Env
const config = require('dotenv').config().parsed;

// Server
const server = new SimpleServer(config);

// Router
const router = new SimpleRouter(server);

// Health and Ping Check
router.add('^/(health|ping)$', (_, res) => res.end());

// Index Route
router.add('^/$', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        method: req.method,
        http: req.httpVersion,
        url: req.url,
        headers: req.headers
    }));
    res.end();
});

// Not Found
router.add('/', (_, res) => {
    res.writeHead(404);
    res.end();
});

// Run Server
server.run();

// Handle Signals
handleSignals(server);
