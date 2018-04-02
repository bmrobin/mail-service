import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as process from 'process';
import chalk from 'chalk';
const log = console.log;
const error = console.error;
const warn = console.warn;

let configFile;
let smtpTransporter;

export class MailService {

    constructor(userService) {
        this.userService = userService;
    }

    setup() {
        return new Promise((resolve) => {
            this.loadConfigFile().then(() => {
                this.configureSmtpTransporter();
                resolve();
            });
        });
    }

    /**
     * Collect the list of users and send emails to all of them.
     * Returns a Promise when the entire operation is completed
     */
    mailUsers(message) {
        let promiseArray = [];
        this.userService.getUsers().forEach((user) => {
            promiseArray.push(this.mailUser(user.getEmailAddr(), message));
        });
        return Promise.all(promiseArray);
    }

    /**
     * Return the loaded OAuth2 config file
     */
    getConfigFile() {
        return configFile;
    }

    /**
     * Load OAuth2 config file from local filesystem
     */
    loadConfigFile() {
        return new Promise((resolve, reject) => {
            const prodFile = process.env.HOME + '/' + 'oauth2-config.json';
            const testFile = process.cwd() + '/src/app/server/services/__tests__/test-oauth2-config.json';
            const env = process.env.NODE_ENV || 'test';
            let file;
            if (env !== 'test') {
                file = prodFile;
            } else {
                warn(chalk.magenta('using test oauth2 config file. email will not be functional without it'));
                file = testFile;
            }
            fs.readFile(file, (err, data) => {
                if (err) {
                    error(chalk.red('couldn\'t load oauth2 config file. file not found or could not be read'));
                    reject();
                    throw err;
                }
                configFile = JSON.parse(data);
                log(chalk.green('successfully loaded oauth2 config file'));
                resolve();
            });
        });
    }

    /**
     * Send an email to a user
     * @param emailAddr email address to mail
     */
    mailUser(emailAddr, message) {
        return smtpTransporter.sendMail(
            this.createMailMessage(emailAddr, message)
        );
    }

    /**
     * Configure a `nodemailer.Transporter` instance with the OAuth2 options from the config file
     */
    configureSmtpTransporter() {
        let smtpOptions = {
            auth: {
                clientId: configFile.clientId,
                clientSecret: configFile.clientSecret,
                refreshToken: configFile.refreshToken,
                type: 'oauth2',
                user: configFile.user
            },
            service: "Gmail"
        };
        smtpTransporter = nodemailer.createTransport(smtpOptions);
    }

    /**
     * Create an email message with to, from, subject, and message information
     * @param toAddr recipient email address
     * @param message message content
     */
    createMailMessage(toAddr, message) {
        let options = {
            from: configFile.user,
            subject: "Mail Service",
            text: message,
            to: toAddr
        };
        return options;
    }
}
