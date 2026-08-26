const express = require('express');
const auth = require('../controllers/auth');
const check = require('../middlewares/auth');

const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.put('/logout', check.isLogin, auth.logout);

module.exports = router;