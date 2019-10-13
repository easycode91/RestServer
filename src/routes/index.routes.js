const express = require('express'); 


const server = express();

server.use(require('./login.routes'));
server.use(require('./usuarios.routes'));
server.use(require('./category.routes'));
server.use(require('./productos.routes'));

module.exports = server;