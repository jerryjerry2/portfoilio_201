const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({
                result: false,
                msg: 'You need to login'
            })
        }

        let parts = authHeader.split(' ');
        console.log(parts);
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.json({
                result: false,
                msg: 'Invalid Token'
            })
        }

        const token = parts[1];
        const decode = jwt.verify(token, 'mysecret');
        console.log(decode);

        next();
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : 'Invalid or Expired token'
        })
        
    }



}

module.exports = {
    isLogin
}