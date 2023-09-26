var express = require('express');
var router = express.Router();
const userservices = require('../services/userservice');
const middleware = require('../middleware/jwtauthen');

router.post('/register', userservices.registerUser);
router.post('/login', userservices.loginUser);
router.post('/changepass', middleware.authenticateToken, userservices.changePass);

router.post('/reserve', middleware.authenticateToken, userservices.reserveZone);

router.get('/history', middleware.authenticateToken, userservices.seeHistory);

module.exports = router;