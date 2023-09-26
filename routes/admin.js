var express = require('express');
var router = express.Router();
const adminservice = require('../services/adminservice');
const { authenticateToken } = require('../middleware/jwtauthen');

router.post('/add', authenticateToken, adminservice.addZone);
router.delete('/:id/delete', adminservice.deleteZone);
router.get('/:id/edit', adminservice.editZone);

router.get('/all', adminservice.seeAll);

module.exports = router;