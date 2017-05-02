import * as Bluebird from 'bluebird';
import { User } from '../models/user';
import { UserService } from './userService';
import nodemailer = require('nodemailer');
import smtpTransport = require('nodemailer-smtp-transport');
import fs = require('fs');
import process = require('process');

export class MailService {

    private configFile: any;
    private userService: UserService = new UserService();
    private smtpTransporter: nodemailer.Transporter;

    public setup(): Promise<any> {
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
    public mailUsers(): Promise<any> {
        let promiseArray = [];
        this.userService.getUsers().forEach((user: User) => {
            promiseArray.push(this.mailUser(user.getEmailAddr()));
        });
        return Promise.all(promiseArray);
    }

    /**
     * Return the loaded OAuth2 config file
     */
    public getConfigFile(): any {
        return this.configFile;
    }

    /**
     * Load OAuth2 config file from local filesystem
     */
    private loadConfigFile(): Promise<any> {
        return new Promise((resolve, reject) => {
            let prodFile = process.env.HOME + '/' + 'oauth2-config.json';
            let testFile = process.cwd() + '/src/main/scripts/app/services/__tests__/test-oauth2-config.json';
            let env = process.env.NODE_ENV || 'test';
            let file = env !== 'test' ? prodFile : testFile;
            fs.readFile(file, (error, data) => {
                if (error) {
                    reject();
                    throw error;
                }
                this.configFile = JSON.parse(<any> data);
                resolve();
            });
        });
    }

    /**
     * Send an email to a user
     * @param emailAddr email address to mail
     */
    private mailUser(emailAddr: string): Bluebird<nodemailer.SentMessageInfo> {
        console.log('emailing user ' + emailAddr);
        return this.smtpTransporter.sendMail(
            this.createMailMessage(emailAddr, "here is your message!")
        );
    }

    /**
     * Configure a `nodemailer.Transporter` instance with the OAuth2 options from the config file
     */
    private configureSmtpTransporter() {
        let smtpOptions: smtpTransport.SmtpOptions = {
            auth: {
                clientId: this.configFile.clientId,
                clientSecret: this.configFile.clientSecret,
                refreshToken: this.configFile.refreshToken,
                type: 'oauth2',
                user: this.configFile.user
            },
            service: "Gmail"
        };
        this.smtpTransporter = nodemailer.createTransport(smtpOptions);
    }

    /**
     * Create an email message with to, from, subject, and message information
     * @param toAddr recipient email address
     * @param message message content
     */
    private createMailMessage(toAddr: string, message: string): nodemailer.SendMailOptions {
        let options: nodemailer.SendMailOptions = {
            from: this.configFile.user,
            subject: "Mail Service",
            text: message,
            to: toAddr
        };
        return options;
    }
}
