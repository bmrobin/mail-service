import { NextFunction, Request, Response, Router } from 'express';

const index: Router = Router();

index.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.send('Hello Benjy');
});

export default index;
