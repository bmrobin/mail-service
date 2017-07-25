import { Router } from 'express';

const index = Router();

index.get('/', (request, response) => {
    response.status(200);
    response.send('mail service available');
});

export default index;
