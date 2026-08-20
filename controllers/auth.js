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

module.exports = {
    register,
    login
}