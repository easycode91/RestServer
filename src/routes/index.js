const { Router } = require('express');
const Usuarios = require('../model/usuarios')
const bcrypt = require('bcrypt');

const router = Router();

router
    .get('/usuario',(req,res)=>{
        res.json(
            {
               message : 'Method GET'
            }
        );
    })
    .get('/usuario/:id',(req,res)=>{
        res.json(
            {
               message : 'Method GET one data'
            }
        );
    })
    .post('/usuario',(req,res)=>{
        let body = req.body
        const usuario = new Usuarios({
            nombre : body.nombre,
            email : body.email,
            password : bcrypt.hashSync(body.password,10),
            role : body.role
        }
        ) 
        usuario.save((err,usuarioDB) => {
            if(err){
                return res.status(400).json({
                    ok : false,
                    err
                });
            }else{
                return res.status(200).json({
                    ok : true,
                    message : 'User created successfully',
                    user : usuarioDB
                });
            }
        })

        
    })
    .put('/usuario/:id',(req,res)=>{
        res.json(
            {
               message : 'Method PUT'
            }
        );
    })
    .delete('/usuario/:id',(req,res)=>{
        res.json(
            {
               message : 'Method DELETE'
            }
        );
    })

    module.exports = router;