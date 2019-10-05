const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{

    const token = req.get('token');
     
    jwt.verify(token,process.env.SECRET_JWT,(err,decode)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err,
                message : 'Token invalid'
            });
        }

        req.data = decode.data; 
        next()
    })
}

const validateAdminRole = (req,res,next)=>{
    const usuario = req.data;
    
    if( usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.status(401).json({
            ok:false,
            message : 'Not authorized'
        });
    }
}


module.exports = {
    verifyToken,
    validateAdminRole
}