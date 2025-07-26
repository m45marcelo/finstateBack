import { connectToDatabase } from './infra/database/connection';
import { app } from './app';
import { env } from './infra/env';


async function startServer() {
    try{
        await connectToDatabase();

        const server = app.listen(env.PORT, () => {
            console.log(`🟢 Servidor Rodando na porta ${env.PORT}`);
            console.log(`📄 Documentação: http://localhost:${env.PORT}/api`);
            console.log(`🌎 Ambiente: ${env.NODE_ENV}`);
        });

        const gracefulShutdown = (signal: string) => {
            console.log(`\n📴 Recebendo sinal ${signal}. Encerrando servidor...`);

            server.close(() => {
                console.log('✅ Servidor encerrado com sucesso');
                process.exit(0)
            })

            setTimeout(() => {
                console.log('❌ Forçando encerramento do servidor');
                process.exit(1);
            }, 10000)
        }

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1)
    }
}

startServer();




