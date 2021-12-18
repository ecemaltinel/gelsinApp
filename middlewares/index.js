const {authenticateAdmin} = require('./authenticateAdmin')
const {isValid} = require('./validate')
const {authenticate} = require('./authenticate')

module.exports={
    authenticateAdmin,
    isValid,
    authenticate,
}