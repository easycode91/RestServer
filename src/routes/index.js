const { Router } = require('express');

const router = Router();

router
    .get('/',(req,res)=>{
        res.json(
            {
               message : 'Method GET'
            }
        );
    })
    .get('/:id',(req,res)=>{
        res.json(
            {
               message : 'Method GET one data'
            }
        );
    })
    .post('/',(req,res)=>{
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
    .put('/:id',(req,res)=>{
        res.json(
            {
               message : 'Method PUT'
            }
        );
    })
    .delete('/:id',(req,res)=>{
        res.json(
            {
               message : 'Method DELETE'
            }
        );
    })

    module.exports = router;