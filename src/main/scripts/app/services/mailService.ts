import { User } from '../models/user';
import { UserService } from './userService';
import nodemailer = require('nodemailer');
import smtpTransport = require('nodemailer-smtp-transport');

let smtpOptions: smtpTransport.SmtpOptions = {
    auth: {
        type: 'oauth2'
    },
    service: "Gmail"
};
let smtpTransporter: nodemailer.Transporter = nodemailer.createTransport(smtpOptions);

export class MailService {

    private userService: UserService = new UserService();

    public mailUsers() {
        this.userService.getUserList().forEach((user: User) => {
            let emailAddr = user.getEmailAddr();
            console.log('emailing user ' + emailAddr);
            smtpTransporter.sendMail(
                this.createMailMessage(emailAddr, "here is your message!")
            );
        });
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
