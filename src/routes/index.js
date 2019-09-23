const { Router } = require('express');

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
        if(body.name === undefined ){
            res.status(404).json(
                {
                    ok : false,
                    err:'Name is necesary'
                }
            );
        }{
            res.status(200).json(
                {
                   message : req.body
                }
            );
        }
        
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