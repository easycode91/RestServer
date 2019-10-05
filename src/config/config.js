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
    urldDb = process.env.MONGO_URI
}

process.env.URL_DB = urldDb;
//=================================================
//My secret token
//================================================= 
process.env.SECRET_JWT = process.env.SECRET_JWT 
//=================================================
//Experation token
//================================================= 
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30
