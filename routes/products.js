const express = require('express');
const {getProducts,addComment,createProduct,updateProduct,addMedia} = require('../controllers/products')
const {addCommentValidation,createProductValidation,updateProductValidation,addMediaValidation} = require('../validations/products')
const {authenticate,authenticateAdmin,isValid} = require('../middlewares/index')

const router = express.Router();

router.route('/').get(getProducts)
router.route('/:id/add-comment').post(authenticate,isValid(addCommentValidation,"body"),addComment)

//Admin routes
router.route('/').post(authenticateAdmin,isValid(createProductValidation,"body"),createProduct)
router.route('/:id').patch(authenticateAdmin,isValid(updateProductValidation,"body"),updateProduct)

router.route('/:id/add-media').post(authenticateAdmin,isValid(addMediaValidation,"files"),addMedia)

module.exports = router;