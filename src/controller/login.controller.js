const Usuarios = require('../model/usuarios')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

let login = (req,res) => {

    const data = req.body;

    Usuarios.findOne(({email : data.email}),(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok : false,
                error :{
                    message : 'Internal error server'
                }
            })
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok : false,
                error :{
                    message : 'Failed (user) or password'
                }
            })
        }
        
        if(!bcrypt.compareSync(data.password,usuarioDB.password)){
            return res.status(400).json({
                ok : false,
                error :{
                    message : 'Failed user or (password)'
                }
            })
        }else{
            const token = jwt.sign({
                data : usuarioDB
            },process.env.SECRET_JWT ,{
                expiresIn : process.env.EXPIRE_TOKEN
            })
            return res.status(200).json({
                ok : true,
                message : 'Welcome to RestServer',
                data : usuarioDB,
                token
            });
        }
    })
} 

module.exports = {
    login
}