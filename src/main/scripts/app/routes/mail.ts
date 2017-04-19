import { NextFunction, Request, Response, Router } from 'express';
import { MailService } from '../services/mailService';

const mail: Router = Router();

let mailService: MailService = new MailService();

mail.get('/', (request: Request, response: Response, next: NextFunction) => {
    mailService.mailUsers();
    response.status(200);
    response.type('application/json');
});

export default mail;
