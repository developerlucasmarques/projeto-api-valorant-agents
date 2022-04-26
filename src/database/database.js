import mongoose from 'mongoose';

export const connectToDatabase = () => {
    mongoose
        .connect('mongodb://localhost:27017/valorant-agents-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MONGODB CONNECT!'))
        .catch((err) => {
            console.log(`Erro ao conectar com o MongoDB, erro: ${err}`);
        });
};
