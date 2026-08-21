const express= require('express');
const personal_info = require('../controllers/personal_info');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', auth.isLogin, personal_info.getProfile);
router.put('/profile', auth.isLogin,personal_info.updateProfile);

module.exports = router;