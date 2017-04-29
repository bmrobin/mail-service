import * as bodyParser from 'body-parser';
import * as express from 'express';
import index from './routes/index';
import mail from './routes/mail';
import users from './routes/users';

const app: express.Express = express();
// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', index);
app.use('/users', users);
app.use('/mail', mail);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  console.log(error);
  res.render('error', {
    message: error.message,
    // hide the stacktrace to the user by setting this to error: {}
    error
  });
  return null;
});

export default app;
