const SimpleServer = require('./src/SimpleServer');
const SimpleRouter = require('./src/SimpleRouter');
const render = require('./src/render');
const { handleSignals } = require('./src/utils');

// Configuration
const config = require('dotenv').config().parsed;

// Server
const server = SimpleRouter(SimpleServer(config)).run();

// Check Route
server.add('^/(health|ping)$', (_, res) => res.end());

// Index Route
server.add('^/$', (req, res) => res
    .writeHead(200, { 'Content-Type': 'text/html' })
    .end(render('index.html', {
        data: req.data ? JSON.parse(req.data) : {}
    }))
);

// Error Route
server.add('/', (_, res) => res
    .writeHead(404, { 'Content-Type': 'text/html' })
    .end(render('404.html'))
);

// Process Signals
handleSignals(server);
