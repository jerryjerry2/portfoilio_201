const auth = require('../services/auth');

const register = async (req, res) => {
    try {
        const result = await auth.register(req.body);

        return res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
};

const login = async (req, res) => {
    try {
        let result = await auth.login(req.body);

        return res.json({
            result : true,
            msg : 'Login Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const result = await auth.logout(req.user.id);
        console.log('Controller : ', req.user);
        
        return res.json({
            result : true,
            msg : 'Logout Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const verifyEmail = async (req, res) =>{
    try {
        const result = await auth.verifyEmail(req.query.token);

        res.json({
            result : true,
            msg : 'Email Verify Successfully'
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const resendEmail = async (req, res) => {
    try {
        const result = await auth.resendEmail(req.body);

        res.json({
            result : true,
            msg : 'Resend Link Successfully'
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    resendEmail
}