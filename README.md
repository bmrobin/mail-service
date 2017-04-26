## Mail Subscriber
A service that allows you to subscribe a group of users to receive email notifications. This is a small project intended to experiment with Express, Nodemailer, and TypeScript

### Requirements
* Node >=7.9.0
* OAuth2 credentials for GMail. Follow [these instructions](https://developers.google.com/identity/protocols/OAuth2) to create credentials for your account. Then create the file `$HOME/oauth2-config.json` that contains the following OAuth2 information:
```
{
    clientId: '000000000000-xxx0.apps.googleusercontent.com',
    clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
    refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
    user: 'your@email.com'
}
```

### Usage
Install dependencies, build the code, and start the Express web server with

    $ npm install
    $ npm start

Interact with the service:

    $ curl -X POST -H "Content-Type: application/json" -d '{"emailAddr": "bmrobin@mail.com"}' localhost:9000/users
    > Created
    $ curl -X POST -H "Content-Type: application/json" -d '{"emailAddr": "bmrobin123456@mail.com"}' localhost:9000/users
    > Created
    $ curl localhost:9000/users
    > [{"emailAddress":"bmrobin@mail.com"}, {"emailAddress":"bmrobin123456@mail.com"}]
    $ curl localhost:9000/mail

Currently only sends a default message - more functionality to come

### Don't Abuse Me
Please don't spam the crap out of people :sob:
