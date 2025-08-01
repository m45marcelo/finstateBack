import mongoose from "mongoose";

import { env } from "../env";

export async function connectToDatabase(): Promise<void> {
    try{
        await mongoose.connect(env.DATABASE_URL);
        console.log('💾 Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('❌ Error ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

mongoose.connection.on('connected', () => {
    console.log('🟢 MongoDb conectado');
})

mongoose.connection.on('error', (error) => {
    console.error('🔴 erro na conexão MongoDB:', error);
})

mongoose.connection.on('disconnected', () => {
    console.log('🟡 MongoDB desconectado')
})