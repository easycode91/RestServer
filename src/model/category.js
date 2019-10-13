const { Schema,model } = require('mongoose');
const muv = require('mongoose-unique-validator');

const categorySchema = new Schema({
    description : {
        type : String,
        unique : true,
        required : [true,'The description is necessary']
    },
    usuario : { type: Schema.Types.ObjectId, ref: 'Usuario'}
})

categorySchema.plugin(muv,{
    message : 'The {PATH} is necessary'
})

module.exports = model('category',categorySchema)
