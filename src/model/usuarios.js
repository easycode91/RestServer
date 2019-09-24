const { Schema, model } = require('mongoose')
const mongoose_unique_validator = require('mongoose-unique-validator');

//Enumeramos y validamos los roles permitidos
let rolValido = {
    values : ['USER_ROLE','ADMIN_ROLE'],
    message : '{VALUE} no es rol permitido'
}

//Creamos nuestro esquema
const usuarioSchema = new Schema({
    nombre : { 
    type : String,
    required :[true,'El nombre es requerido']
    },
    email :{
        type : String,
        required : [true, 'El correo es necesario'],
        unique : true
    },
    password :{
        type : String,
        required : [true, 'El password es necesario']
    },
    img :{
        type : String,
        required : false
    },
    role :{
        type : String,
        required : [true, 'El rol es necesario'],
        default : 'USER_ROLE',
        enum :rolValido
    },
    estado :{
        type : Boolean,
        default : true
    },
    google :{
        type : Boolean,
        default : false
    }
    
})
//Validar una propiedad unica
usuarioSchema.plugin(mongoose_unique_validator,{
    message : 'el {PATH} ya se encuentra registrado'
});
//Oculta un campo
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
}
//Exportamos el modulo
module.exports = model('usuario',usuarioSchema);