function handleSignals(server) {
    process.on('SIGTERM', onHandleSignal);
    process.on('SIGINT', onHandleSignal);
    function onHandleSignal(signal) {
        console.log(`\nHandling Interrupt: ${signal}`);
        server.close(() => {
            console.log('Orderly Shutdown...');
            process.exit(0);
        });
    }
}
module.exports = { handleSignals };
