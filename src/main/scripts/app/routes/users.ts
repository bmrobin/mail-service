import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/userService';

const users: Router = Router();

let userService: UserService = new UserService();

users.get('/', (request: Request, response: Response, next: NextFunction) => {
    console.log('GET received on user route');
    response.status(200);
    response.type('application/json');
    response.send(userService.getUserList());
});

users.post('/', (request: Request, response: Response, next: NextFunction) => {
    console.log('POST received on user route');
});

export default users;
