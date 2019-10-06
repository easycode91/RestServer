require('./config/config')

const express = require('express');
const morgan = require('morgan')
const path = require('path');
const { connectedDB } = require('./database');
//Initialitation
const app = express();

//Middlewares
app.use(express.urlencoded({ extended : false }));
app.use(express.json())
app.use(morgan('dev'));
//Static files
app.use(express.static(path.join(__dirname,'public')))
//Routes
app.use(require('./routes/index.routes'))
//Database
connectedDB();
//Starting server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

