import express from 'express';
import cors from 'cors';
import { router } from './src/routes/agents.routes.js';
import { connectToDatabase } from './src/database/database.js';

const port = 3000;
const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/valorant', router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
