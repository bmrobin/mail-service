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
    if (request.body.emailAddress) {
        userService.addUser(request.body.emailAddress);
        response.sendStatus(201);
    } else {
        response.sendStatus(422);
    }
});

users.delete('/:emailAddress', (request, response) => {
    if (request.params.emailAddress) {
        userService.deleteUser(request.params.emailAddress);
        response.sendStatus(200);
    } else {
        response.sendStatus(422);
    }
});

export default users;
