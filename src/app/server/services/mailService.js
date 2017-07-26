import { UserService } from './userService';
import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as process from 'process';

let configFile;
let userService = new UserService();
let smtpTransporter;

export class MailService {

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
    mailUsers() {
        let promiseArray = [];
        userService.getUsers().forEach((user) => {
            promiseArray.push(this.mailUser(user.getEmailAddr()));
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
            let prodFile = process.env.HOME + '/' + 'oauth2-config.json';
            let testFile = process.cwd() + '/src/app/server/services/__tests__/test-oauth2-config.json';
            let env = process.env.NODE_ENV || 'test';
            let file = env !== 'test' ? prodFile : testFile;
            fs.readFile(file, (error, data) => {
                if (error) {
                    reject();
                    throw error;
                }
                configFile = JSON.parse(data);
                resolve();
            });
        });
    }

    /**
     * Send an email to a user
     * @param emailAddr email address to mail
     */
    mailUser(emailAddr) {
        console.log('emailing user ' + emailAddr);
        return smtpTransporter.sendMail(
            this.createMailMessage(emailAddr, "here is your message!")
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
