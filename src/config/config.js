//=================================================
//PORT
//=================================================
process.env.PORT = process.env.PORT || 4000
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
process.env.EXPIRE_TOKEN = '48h'
//=================================================
//Client ID google API
//================================================= 
process.env.CLIENT_ID = process.env.CLIENT_ID || '692720899870-msks5egk58psd3k9r2e5qok7svps87mh.apps.googleusercontent.com' 