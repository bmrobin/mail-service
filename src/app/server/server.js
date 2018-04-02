import * as http from 'http';
import expressApp from './express';
import chalk from 'chalk';
const log = console.log;
const error = console.error;

// create server and listen on provided port (on all network interfaces).
const server = http.createServer(expressApp);
server.listen(9000);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  let bind = 'Pipe ' + 9000;

  // handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      error(chalk.red(bind + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      error(chalk.red(bind + ' is already in use'));
      process.exit(1);
      break;
    default:
      throw err;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  log(chalk.green('Listening on ' + bind));
}
