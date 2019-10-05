const mongoose = require('mongoose');

 async function connectedDB() {
  await  mongoose.connect(process.env.URL_DB,
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




