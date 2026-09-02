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
    const verification_expires = new Date(Date.now() + 60 * 3000); // 1 minute

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

    if(checkEmail[0].is_verified == 0){
        throw new Error('Email not yet verified');
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

const verifyEmail = async (token) => {
    //console.log('Service : ', token);
    if(!token){
        throw new Error('Token is required');
    }

    let checkToken = await auth.findVerificationToken(token);
    console.log(checkToken);
    if(checkToken.length == 0){
        throw new Error('Token is invalid');
    }

    if(checkToken[0].is_verified){
        throw new Error('Email Already Verified');
    }
    
    if(!checkToken[0].verification_expires || new Date(checkToken[0].verification_expires) < new Date()){
        throw new Error('Link is expired');
    }

    await auth.verifyEmail(checkToken[0].id);
    
}

const resendEmail = async (body) => {
    if(!body.email){
        throw new Error('Email is required');
    }

    const checkEmail = await auth.findByEmail(body.email);
    if(checkEmail.length == 0){
        throw new Error('Invalid Email');
    }

    if(checkEmail[0].is_verified){
        throw new Error('Email already verified');
    }

    const verification_token = crypto.randomBytes(32).toString('hex');
    const verification_expires = new Date(Date.now() + 60 * 3000); // 1 minute

    const data = {
        id : checkEmail[0].id,
        verification_token,
        verification_expires
    }

    await auth.updateVerificationToken(data);  //update to db
    await mailService.sendVerificationEmail(body.email, verification_token); //sent to user
    
}

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    resendEmail
}