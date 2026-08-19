const auth = require('../models/auth');
const bcrypt = require('bcryptjs');

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

module.exports = {
    register
}