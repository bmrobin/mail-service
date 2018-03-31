import { Router } from 'express';
import { MailService } from '../services/mailService';

let mailService;

export const setUserService = (userService) => {
    mailService = new MailService(userService)
    mailService.setup();
}

export const mail = Router()
    .post('/', (request, response) => {
        mailService.mailUsers(request.body.message).then(() => {
            response.type('application/json');
            response.sendStatus(200);
        });
    });

export default mail;
