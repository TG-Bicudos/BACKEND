const express = require('express');
const cors = require('cors');
const router = require('./router');
const drive = require('./drive'); // Importa o drive.js corretamente

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware de roteamento para as rotas definidas no router.js
app.use(router);

// Middleware de roteamento para o Google Drive (rotas de upload e listagem de arquivos)
app.use('/drive', drive); // Todas as rotas relacionadas ao Google Drive começam com '/drive'

module.exports = app;
