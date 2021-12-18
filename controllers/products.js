const httpStatus = require('http-status')
const {products,create,update,find} = require('../services/products')
const path = require("path");


const getProducts = (req,res) =>{
    products().then((productList)=>{
        if(!productList) {res.status(httpStatus.INTERNAL_SERVER_ERROR).send('There is a problem')}
        else{res.status(httpStatus.OK).send(productList)}
    }).catch((err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const createProduct = (req,res) =>{
    req.body.user_id = req.user;
    create(req.body).then((product)=>{
        if(!product){res.status(httpStatus.INTERNAL_SERVER_ERROR).send('There is a problem')}
        else{res.status(httpStatus.OK).send(product)}
    }).catch((err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const updateProduct = (req,res) =>{
    if (!req.params.id){return res.status(httpStatus.BAD_REQUEST).send({ message: "Product id should be given" });}
    else{
      update(req.params.id,req.body).then((product)=>{
        if(!product) res.status(httpStatus.INTERNAL_SERVER_ERROR).send('There is a problem')
        res.status(httpStatus.OK).send(product)
    }).catch((err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
    }
    
}

const addComment = (req,res) =>{
    if (!req.params.id) {return res.status(httpStatus.BAD_REQUEST).send({ message: "Product id should be given" });}
    else{
      find(req.params.id).then((product) => {
        if (!product) return res.status(httpStatus.NOT_FOUND).send({ message: "Product does not exist" });
        const comment = {
          ...req.body,
          created_at: new Date(),
          user_id: req.user,
        };
        product.comments.push(comment);
        update(req.params.id, product)
          .then((updatedDoc) => {
            if (!updatedDoc) {return res.status(httpStatus.NOT_FOUND).send({ message: "Product does not exist" });}
            else{res.status(httpStatus.OK).send(updatedDoc);}          
          })
          .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
      });
    }
  
}

const addMedia = (req, res) => {
    if (!req.params.id || !req.files?.file){return res.status(httpStatus.BAD_REQUEST).send({ message: "Lack of id/file" });} 
    else{
      find(req.params.id).then((product) => {
        if (!product) return res.status(httpStatus.NOT_FOUND).send({ message: "Product does not exist" });
        const extension = path.extname(req.files.file.name);
        const fileName = `${product._id?.toString()}${extension}`;
        const folderPath = path.join(__dirname, "../", "uploads/products", fileName);
  
        req.files.file.mv(folderPath, function (err) {
          if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
          product.media = fileName;
          update(req.params.id, product)
            .then((updatedDoc) => {
              if (!updatedDoc) {return res.status(httpStatus.NOT_FOUND).send({ message: "Product does not exist" });}
              else{res.status(httpStatus.OK).send(updatedDoc);
              }
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
        });
      });
    }
  };

module.exports={
    getProducts,
    createProduct,
    updateProduct,
    addComment,
    addMedia  
}