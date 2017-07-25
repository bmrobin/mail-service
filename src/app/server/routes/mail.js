import { Router } from 'express';
import { MailService } from '../services/mailService';

const mail = Router();

let mailService = new MailService();
mailService.setup();

mail.get('/', (request, response) => {
    mailService.mailUsers().then(() => {
        response.type('application/json');
        response.sendStatus(200);
    });
});

export default mail;
