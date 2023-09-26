var express = require('express');
var router = express.Router();
const carservice = require('../services/carservice');
const { authenticateToken } = require('../middleware/jwtauthen');

router.post('/add', authenticateToken, carservice.addCar);
router.delete('/:id/delete', carservice.deleteCar);
router.get('/:id/edit', carservice.editCar);

module.exports = router;