const { Schema, model } = require("mongoose");
const muv = require("mongoose-unique-validator");

var productSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  precioUni: { type: Number, required: [true, "El precio únitario es necesario"]},
  descripcion: { type: String, required: false },
  disponible: { type: Boolean, required: true, default: true },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" }
});

productSchema.plugin(muv, {
  message: "The {PATH} is necessary"
});

module.exports = model("Product", productSchema);
