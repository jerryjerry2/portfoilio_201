const auth = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailService = require('../services/mailService');

const register = async (body) => {
    if(!body.email || !body.password){
        throw new Error('Email and Password is required');
    }

    let checkEmail = await auth.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error('Email is duplicate');
    }
    
    const hashPassword = await bcrypt.hash(body.password, 10);
    const verification_token = crypto.randomBytes(32).toString('hex');
    const verification_expires = new Date(Date.now() + 60 * 60 * 1000); //1h

    body.password = hashPassword;
    body.verification_token = verification_token;
    body.verification_expires = verification_expires;
    
    const result = await auth.register(body);

    await mailService.sendVerificationEmail(body.email, verification_token);

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

    await auth.updateToken(checkEmail[0].id, token);

    return {
        id : checkEmail[0].id,
        email : checkEmail[0].email,
        token
    }
}

const logout = async (id) => {
    await auth.updateToken(id, null);
}

module.exports = {
    register,
    login,
    logout
}