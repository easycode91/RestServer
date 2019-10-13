const {Router} = require('express');
const categoryController = require('../controller/categoryController')
const { verifyToken,validateAdminRole } = require('../middlewares/authentication')

const router = Router();

router
    .get('/category',verifyToken,categoryController.getAllCategory)
    .get('/category/:id',verifyToken,categoryController.getByIdCategory)
    .post('/category',[verifyToken,validateAdminRole],categoryController.createCategory)
    .put('/category/:id',[verifyToken,validateAdminRole],categoryController.updateCategory)
    .delete('/category/:id',[verifyToken,validateAdminRole],categoryController.deleteCategory)

module.exports = router;
