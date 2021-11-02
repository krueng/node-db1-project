const express = require("express");
const server = express();

const accountsRouter = require('./accounts/accounts-router');

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('Node DB1 Project')
});

module.exports = server;
