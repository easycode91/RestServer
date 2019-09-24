require('./config/config')

const express = require('express');
const { connectedDB } = require('./database');
//Initialitation
const app = express();

//Middlewares
app.use(express.urlencoded({ extended : false }));
app.use(express.json())
//Routes
app.use(require('./routes/index'))
//Database
connectedDB();
//Starting server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

