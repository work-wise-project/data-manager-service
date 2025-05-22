import express, { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';
import { createServer as createHttpsServer } from 'https';
import { ZodError } from 'zod';
import { interviewRouter, userRouter } from './router';
import resumeRoute from './router/resumeRoute';
import skillRoute from './router/skillRoute';
import { getConfig } from './services/config';

const { isProductionEnv, httpsCert, httpsKey, port } = getConfig();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Data Manager Server is running!');
});

app.use('/users', userRouter);
app.use('/interviews', interviewRouter);
app.use('/skills', skillRoute);
app.use('/resume', resumeRoute);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
        const errorMessage = error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
        }));

        res.status(HttpStatus.BAD_REQUEST).send(errorMessage);
        return;
    }

    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
});

const serverToRun = isProductionEnv ? createHttpsServer({ key: httpsKey, cert: httpsCert }, app) : app;
serverToRun.listen(port, () => {
    console.log(`listening on port ${port} (${isProductionEnv ? 'https' : 'http'})`);
});
