const {connectDB} = require('./mongodb')
const {connectAnotherDb} = require('./anotherdb')

module.exports = () => {
    connectDB(),
    connectAnotherDb()
}