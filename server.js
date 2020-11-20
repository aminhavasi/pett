const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const rfs = require('rotating-file-stream');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./src/db/mongo');
//-----------------------------------------------
db();
const port = process.env.PORT || 5000;
const corsOptions = {
    exposedHeaders: 'x-auth-token',
};

let httpLoger = rfs.createStream('httpLoger.log', {
    interval: '1d',
    path: path.resolve(__dirname + '/src/log'),
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('combined', { stream: httpLoger }));

app.use('/api/auth', require('./src/routes/auth'));
app.use((req, res, next) => {
    res.status(404).send('request failed!');
    next();
});

httpServer.listen(port, () => {
    console.log(`server is running  on port ${port}`);
});
