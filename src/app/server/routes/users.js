import { Router } from 'express';
import { UserService } from '../services/userService';

const users = Router();

let userService = new UserService();

users.get('/', (request, response) => {
    response.status(200);
    response.type('application/json');
    response.send(userService.getUsers());
});

users.post('/', (request, response) => {
    if (request.body.emailAddr) {
        userService.addUser(request.body.emailAddr);
        response.sendStatus(201);
    } else {
        response.sendStatus(422);
    }
});

export default users;