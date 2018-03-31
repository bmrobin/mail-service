import * as bodyParser from 'body-parser';
import index from './routes/index';
import { mail, setUserService as setMailUserService } from './routes/mail';
import { UserService } from './services/userService';
import { users, setUserService } from './routes/users';
import cors from 'cors';
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
expressApp.use((error, req, res) => {
  res.status(error['status'] || 500);
  console.log(error);
  res.render('error', {
    message: error.message,
    // hide the stacktrace to the user by setting this to error: {}
    error
  });
  return null;
});

export default expressApp;
