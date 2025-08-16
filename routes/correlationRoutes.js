const express = require('express');
const router = express.Router();
const correlationController = require('../controllers/correlationControllers');

router.post('/calcular', correlationController.calcular);

module.exports = router;
