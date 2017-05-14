import { NextFunction, Request, Response, Router } from 'express';
import { MailService } from '../services/mailService';

const mail: Router = Router();

let mailService: MailService = new MailService();
mailService.setup();

mail.get('/', (request: Request, response: Response, next: NextFunction) => {
    mailService.mailUsers().then(() => {
        response.type('application/json');
        response.sendStatus(200);
    });
});

export default mail;
