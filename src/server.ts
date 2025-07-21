import express, { Express } from 'express';
import { connectToDatabase } from './infra/database/connection';

async function startServer() {
    await connectToDatabase();

    const app: Express = express();
    const PORT = 3000;

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('API Ok');
    });
    
    app.listen(PORT, () => {
        console.log(`🟢 Servidor Rodando na porta ${PORT}`);
    })
}

startServer();




