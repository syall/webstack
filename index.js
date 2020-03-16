const SimpleServer = require('./src/SimpleServer');
const SimpleRouter = require('./src/SimpleRouter');
const { handleSignals } = require('./src/utils');

// Dot Env
const config = require('dotenv').config().parsed;

// Server
const server = new SimpleServer(config);

// Router
const router = new SimpleRouter(server);

// Health and Ping Check
router.add('^/(health|ping)$', (_, res) => res.end());

// Index Route
router.add('^/$', (req, res) => res
    .writeHead(200, { 'Content-Type': 'application/json' })
    .end(req.data.length === 0
        ? 'no data'
        : JSON.stringify(JSON.parse(req.data))));


// Not Found
router.add('/', (_, res) => res.writeHead(404).end());

// Run Server
server.run();

// Handle Signals
handleSignals(server);
