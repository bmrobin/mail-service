import * as bodyParser from 'body-parser';
import index from './routes/index';
import { mail, setUserService as setMailUserService } from './routes/mail';
import { UserService } from './services/userService';
import { users, setUserService } from './routes/users';
import cors from 'cors';
import chalk from 'chalk';
const error = console.error;
const express = require('express');

// setup
const expressApp = express();
const userService = new UserService();
setUserService(userService);
setMailUserService(userService);
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cors());

// routes
expressApp.use('/', index);
expressApp.use('/users', users);
expressApp.use('/mail', mail);

// catch 404 and forward to error handler
expressApp.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
expressApp.use((err, req, res) => {
  res.status(err['status'] || 500);
  error(chalk.red(err));
  res.render('error', {
    message: err.message,
    // hide the stacktrace to the user by setting this to err: {}
    err
  });
  return null;
});

export default expressApp;
