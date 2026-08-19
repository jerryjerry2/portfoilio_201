const express= require('express');
const personal_info = require('../controllers/personal_info');

const router = express.Router();

router.get('/profile', personal_info.getProfile);
router.put('/profile', personal_info.updateProfile);

module.exports = router;