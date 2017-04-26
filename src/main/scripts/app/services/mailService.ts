import { User } from '../models/user';
import { UserService } from './userService';
import nodemailer = require('nodemailer');
import smtpTransport = require('nodemailer-smtp-transport');
import fs = require('fs');
import process = require('process');

export class MailService {

    private userService: UserService = new UserService();
    private smtpTransporter: nodemailer.Transporter;
    private configFile: any;

    constructor() {
        this.loadConfigFile().then(() => {
            this.configureSmtpTransporter();
        });
    }

    public mailUsers() {
        this.userService.getUserList().forEach((user: User) => {
            let emailAddr = user.getEmailAddr();
            console.log('emailing user ' + emailAddr);
            this.smtpTransporter.sendMail(
                this.createMailMessage(emailAddr, "here is your message!")
            );
        });
    }

    private loadConfigFile(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(process.env.HOME + '/oauth2-config.json', (error, data) => {
                if (error) {
                    reject();
                    throw error;
                }
                this.configFile = JSON.parse(<any> data);
                resolve();
            });
        });
    }

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

    private createMailMessage(toAddr: string, message: string): nodemailer.SendMailOptions {
        let options: nodemailer.SendMailOptions = {
            from: "bmrobin9823@gmail.com",
            subject: "Mail Service",
            text: message,
            to: toAddr
        };
        return options;
    }
}
