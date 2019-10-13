const Product = require("../model/product");

let searchProduct = (req,res)=>{
  const terms = req.params.terms;
  const regex = new RegExp(terms,'i');

  Product.find({nombre : regex})
    .populate('Categoria','nombre')
    .exec((err,data)=>{
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }
       res.json({
         ok : true,
         data
       });
    })
}

let getAllProduct = (req, res) => {
  const limite = Number(req.query.limite || 3);
  const desde = Number(req.query.desde || 0);
  Product.find({disponible : true})
    .skip(desde)
    .limit(limite)
    .populate('Usuario','nombre email')
    .sort("nombre")
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }
      res.status(200).json({
        ok: true,
        Products : data
      });
    });
};

let getOneProduct = (req, res) => {
    const id = req.params.id;

  Product.findById(id,(err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }
      if (!data) {
        return res.status(500).json({
          ok: false,
          error: 'This ID not exist'
        });
      }
      res.status(200).json({
        ok: true,
        data
      });
    });
};

let createProduct = (req, res) => {
  const usuario_id = req.data._id;
  const body = req.body;
  const product = new Product({
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario: usuario_id
  });

  product.save((err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }

    if (!data) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    }
    res.status(200).json({
      ok: true,
      message: "Product created successfully",
      data
    });
  });
};

let updateProduct = (req, res) => {

    const { id } = req.params;
    const body = req.body;
    const productObject = {
      nombre: body.nombre,
      precioUni: body.precioUni,
      descripcion: body.descripcion,
      disponible: body.disponible,
      categoria: body.categoria
    }
  
    Product.findByIdAndUpdate(id,productObject,{ new : true,runValidators : true},(err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }
  
      if (!data) {
        return res.status(400).json({
          ok: false,
          error: err
        });
      }
      res.status(200).json({
        ok: true,
        message: "Product updated successfully",
        data
      });
    });
};

let deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.findById(id,(err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }

    if (!data) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    }
    data.disponible = false;
    data.save( (err,dataDelete) =>{
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }
      res.status(200).json({
        ok: true,
        message: "Product deleted successfully",
        dataDelete
      });
    })
  });
};

module.exports = {
  getAllProduct,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct
};
