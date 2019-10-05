//=================================================
//PORT
//=================================================
process.env.PORT = process.env.PORT || 3000
//=================================================
//ENVIROMENT
//=================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
//=================================================
//CONNECTION
//================================================= 
let urldDb;
if(process.env.NODE_ENV === 'dev'){
  urldDb = 'mongodb://localhost/cafe';
}else{
    urldDb = 'mongodb+srv://jhonatan:1077449704p@cluster0-j60p0.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URL_DB = urldDb;
