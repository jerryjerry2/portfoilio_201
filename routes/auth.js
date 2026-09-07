const express = require('express');
const auth = require('../controllers/auth');
const check = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const schema = require('../validators/auth');

const router = express.Router();

router.post('/register', validate(schema.registerUserSchema), auth.register);
router.post('/login', validate(schema.loginUserSchema),auth.login);
router.put('/logout', check.isLogin, auth.logout);
router.get('/auth/verify-email', auth.verifyEmail);
router.put('/resend-email', auth.resendEmail);

module.exports = router;