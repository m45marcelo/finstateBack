import express from 'express';
import helmet from 'helmet';
import { env } from './infra/env';
import cors from 'cors';
import { routes } from './infra/http/routes';
import { errorMiddleware } from './infra/http/middlewares/errorMiddleware';
const app = express();

//Middlewares de segurança
app.use(helmet());
app.use(cors({
    origin: env.NODE_ENV === 'production'
        ? ['https://futurosite.com']
        : true,
        credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));

// if(env.NODE_ENV === 'development') {
//     app.use((req, res, next) => {
//         console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`)
//         next();
//     })
// }

app.use('/api', routes);

app.use(errorMiddleware);

app.use((req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada',
        status: 404
    })
})

export { app }