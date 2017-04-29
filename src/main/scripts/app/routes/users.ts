import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/userService';

const users: Router = Router();

let userService: UserService = new UserService();

users.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.status(200);
    response.type('application/json');
    response.send(userService.getUsers());
});

users.post('/', (request: Request, response: Response, next: NextFunction) => {
    if (request.body.emailAddr) {
        userService.addUser(request.body.emailAddr);
        response.sendStatus(201);
    } else {
        response.sendStatus(422);
    }
});

export default users;
