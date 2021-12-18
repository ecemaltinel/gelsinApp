const httpStatus = require('http-status')
const User = require("../models/user");

const users = () => {
    return User.find({});
}

const create = (user) =>{
    return new User(user).save();
}


const find = (id) =>{
    return User.findById(id);
}

const login = (user) =>{
    return User.findOne(user);
}

const modify = (where,data) =>{
    return User.findOneAndUpdate(where,data,{new:true})
}

module.exports = {
    users,
    create,
    find,
    login,
    modify
}