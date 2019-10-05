const { Router } = require("express");

//owner routes
const indexController = require('../controller/usuarios.controller')
const { verifyToken,validateAdminRole } = require('../middlewares/authentication')
const router = Router();

router
  .get("/usuario", verifyToken ,indexController.getUsers)
  .get("/usuario/:id", indexController.getOneUser)
  .post("/usuario",[verifyToken,validateAdminRole] , indexController.createUser)
  .put("/usuario/:id",[verifyToken,validateAdminRole]  ,indexController.updateUser)
  .delete("/usuario/:id",[verifyToken,validateAdminRole]  ,indexController.deleteUser);

module.exports = router;
