import { Router } from 'express';

let userService;

export const setUserService = (service) => {
    userService = service;
}

export const users = Router()
    .get('/', (request, response) => {
        response.status(200);
        response.type('application/json');
        response.send(userService.getUsers());
    }).post('/', (request, response) => {
        if (request.body.emailAddress) {
            userService.addUser(request.body.emailAddress);
            response.sendStatus(201);
        } else {
            response.sendStatus(422);
        }
    }).delete('/:emailAddress', (request, response) => {
        if (request.params.emailAddress) {
            userService.deleteUser(request.params.emailAddress);
            response.sendStatus(200);
        } else {
            response.sendStatus(422);
        }
    });

