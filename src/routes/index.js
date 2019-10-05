const { Router } = require("express");
const Usuarios = require("../model/usuarios");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const router = Router();

router
  .get("/usuario", (req, res) => {
      let desde = Number(req.query.desde || 0);
      let limite = Number(req.query.limite || 5);
    Usuarios.find({estado:true})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      } else {
          Usuarios.count({estado:true},(err,conteo) => {
            return res.status(200).json({
                ok: true,
                numRegistros: conteo,
                user: usuarioDB
              });
          })
      }
    });
  })
  .get("/usuario/:id", (req, res) => {
    res.json({
      message: "Method GET one data"
    });
  })
  .post("/usuario", (req, res) => {
    let body = req.body;
    const usuario = new Usuarios({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
    });
    usuario.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      } else {
        return res.status(200).json({
          ok: true,
          message: "User created successfully",
          user: usuarioDB
        });
      }
    });
  })
  .put("/usuario/:id", (req, res) => {
    let { id } = req.params;
    let data = _.pick(req.body, ["nombre", "email", "img", "roles"]);

    Usuarios.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true },
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        } else {
          res.status(200).json({
            ok: true,
            message: "User updated successfull",
            usuarioDB
          });
        }
      }
    );
  })
  .delete("/usuario/:id", (req, res) => {
    let { id } = req.params;
    //Eliminar el registro fisicamente
    /*
    Usuarios.findByIdAndDelete(id,(err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
              ok: false,
              err
            });
          } 
          if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message : 'No se encontraron usuarios para eliminar con el ID : ' + id
                }
              });
          }
            return res.status(200).json({
              ok: true,
              message: "User deleted successfully",
              user: usuarioDB
            });
          
    })
*/
//modificar el estado para mostrar como borrado
Usuarios.findByIdAndUpdate(id,{estado : false},{new : true},(err,usuarioDB)=>{
    if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      } 
      if(!usuarioDB){
        return res.status(400).json({
            ok: false,
            err:{
                message : 'No se encontraron usuarios para eliminar con el ID : ' + id
            }
          });
      }
        return res.status(200).json({
          ok: true,
          message: "User deleted successfully",
          user: usuarioDB
        });
      
})
  });

module.exports = router;
