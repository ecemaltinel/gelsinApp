const express = require('express');
const {getUsers, createUser, findUser, loginUser, resetPassword} = require('../controllers/users')
const {createUserValidation,loginUserValidation,createAdminUserValidation} = require('../validations/users')
const {authenticateAdmin,isValid} = require('../middlewares/index')

const router = express.Router();


router.route('/login').post(isValid(loginUserValidation,"body"),loginUser)
router.route('/create-admin-user').post(isValid(createAdminUserValidation,"body"),createUser)

// Admin routes
router.route('/').get(authenticateAdmin,getUsers)
router.route('/').post(authenticateAdmin,isValid(createUserValidation,"body"),createUser)
router.route('/:id').get(authenticateAdmin,findUser)

router.route('/reset-password').post(resetPassword)

module.exports = router;