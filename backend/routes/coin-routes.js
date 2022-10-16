const express = require('express');
const coinController = require('../controller/coinController');
 
const router = express.Router();

router.post('/addCoin', coinController.addCoin);

router.get('/getList', coinController.getList);

module.exports = router;