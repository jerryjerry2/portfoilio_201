const auth = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (body) => {
    if(!body.email || !body.password){
        throw new Error('Email and Password is required');
    }

    let checkEmail = await auth.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error('Email is duplicate');
    }
    
    const hashPassword = await bcrypt.hash(body.password, 10);
    
    body.password = hashPassword;
    console.log(body);
    
    const result = await auth.register(body);
    const row = await auth.findById(result);
    
    return row;
};

const login = async (body) => {
    if(!body.email || !body.password){
        throw new Error('Email and Password is required');
    }

    let checkEmail = await auth.findByEmail(body.email);
    //console.log(checkEmail);
    
    if(checkEmail.length == 0){
        throw new Error('Email and Password is invalid');
    }
    
    let checkPassword = await bcrypt.compare(body.password, checkEmail[0].password_hash);
    if(checkPassword == false){
        throw new Error('Email and Password is invalid');
    }

    const token = jwt.sign(
        {id : checkEmail[0].id},
        'mysecret',
        {expiresIn : '1D'}
    );

    return {
        id : checkEmail[0].id,
        email : checkEmail[0].email,
        token
    }
}

module.exports = {
    register,
    login
}