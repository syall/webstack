/** @function handleSignals
 * @description Handles Safe Closing on SIGTERM/SIGINT of Process.
 * @param {Server} server - Server to Close.
 */
function handleSignals(server) {

    // Signals
    process.on('SIGTERM', onHandleSignal);
    process.on('SIGINT', onHandleSignal);

    // Handle Signal and Close
    function onHandleSignal(signal) {
        console.log(`\nHandling Interrupt: ${signal}`);
        server.close(() => {
            console.log('Orderly Shutdown...');
            process.exit(0);
        });
    }

}
module.exports = { handleSignals };
