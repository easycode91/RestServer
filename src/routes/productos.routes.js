const { Router } = require("express");
const productosController = require("../controller/productosController");
const { verifyToken,validateAdminRole } = require('../middlewares/authentication')

const router = Router();

router
  .get("/product", productosController.getAllProduct)
  .get("/product/search/:terms",productosController.searchProduct)
  .get("/product/:id", productosController.getOneProduct)
  .post("/product",[verifyToken,validateAdminRole],productosController.createProduct)
  .put("/product/:id",[verifyToken,validateAdminRole],productosController.updateProduct)
  .delete("/product/:id",[verifyToken,validateAdminRole], productosController.deleteProduct);

module.exports = router;
