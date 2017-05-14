import { NextFunction, Request, Response, Router } from 'express';

const index: Router = Router();

index.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.status(200);
    response.send('mail service available');
});

export default index;
