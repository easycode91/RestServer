const mongoose = require('mongoose');

 async function connectedDB() {
  await  mongoose.connect('mongodb://localhost/cafe',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex : true
        },(err,res)=>{
            if(err) throw err;
            console.log('Database is connected');
        })
        
        
}

module.exports = { connectedDB };




