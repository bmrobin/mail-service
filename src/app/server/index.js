/**
 * Debugging entrypoint for VS Code to recognize babel
 * 
 * server.js is still entrypoint for Webpack
 */
require('babel-register');
require('./server.js');
