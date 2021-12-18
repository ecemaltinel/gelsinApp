const Product = require('../models/products')


const products = () =>{
    return Product.find({});
}

const create = (data) => {
    return new Product(data).save();
}

const update = (id,data) => {
    return Product.findByIdAndUpdate(id,data,{new:true})
}

const find = (id) =>{
    return Product.findById(id);
}

module.exports={
    products,
    create,
    update,
    find,
    
}