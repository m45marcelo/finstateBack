import express, { Express } from 'express';
import { connectToDatabase } from './infra/database/connection';
import { userRoutes } from './infra/http/routes/userRoutes';
import { errorMiddleware } from './infra/http/middlewares/errorMiddleware';


async function startServer() {
    await connectToDatabase();

    const app: Express = express();
    const PORT = 3000;

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('API Ok');
    });

    

    app.use('/', userRoutes);

    app.use(errorMiddleware);
    
    app.listen(PORT, () => {
        console.log(`🟢 Servidor Rodando na porta ${PORT}`);
    })
}

startServer();




