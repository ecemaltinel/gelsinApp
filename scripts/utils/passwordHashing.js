const cryptoJs = require('crypto-js');

const passwordToHash = (password) => {

    const hashKey = cryptoJs.HmacSHA1(password,process.env.SECRET_HASH_KEY).toString();
    return cryptoJs.HmacSHA256(password, hashKey).toString();
}

module.exports={
    passwordToHash
}