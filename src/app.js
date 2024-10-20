const express = require('express');
const cors = require('cors');
const router = require('./router');
const drive = require('./drive'); 

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(router);

app.use('/drive', drive);

module.exports = app;
