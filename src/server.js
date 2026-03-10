"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./infra/database/connection");
const app_1 = require("./app");
const env_1 = require("./infra/env");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_1.connectToDatabase)();
            const server = app_1.app.listen(env_1.env.PORT, () => {
                console.log(`🟢 Servidor Rodando na porta ${env_1.env.PORT}`);
                console.log(`📄 Documentação: http://localhost:${env_1.env.PORT}/api`);
                console.log(`🌎 Ambiente: ${env_1.env.NODE_ENV}`);
            });
            const gracefulShutdown = (signal) => {
                console.log(`\n📴 Recebendo sinal ${signal}. Encerrando servidor...`);
                server.close(() => {
                    console.log('✅ Servidor encerrado com sucesso');
                    process.exit(0);
                });
                setTimeout(() => {
                    console.log('❌ Forçando encerramento do servidor');
                    process.exit(1);
                }, 10000);
            };
            process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
            process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        }
        catch (error) {
            console.error('❌ Erro ao iniciar servidor:', error);
            process.exit(1);
        }
    });
}
startServer();
