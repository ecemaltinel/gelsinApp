const express = require('express');
const app = express();
const httpStatus = require('http-status')
const config = require('./config/index')
const connectDatabases = require('./loaders/index')
const {userRoutes,productRoutes} = require('./routes/index')
const fileUpload = require("express-fileupload");
const events = require('./scripts/events')

config();
connectDatabases()
events()

app.use(express.json());
app.use(fileUpload());

app.get('/',(req,res)=>{
    console.log('Welcome!')
    res.status(httpStatus.OK).send('Welcome!')
})

app.use('/users',userRoutes)
app.use('/products',productRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Application is running on ${process.env.PORT}`)
})