const express = require('express'); 


const server = express();

server.use(require('./login.routes'));
server.use(require('./usuarios.routes'));

module.exports = server;