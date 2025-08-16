// routes/binomialRoutes.js
const express = require('express');
const router = express.Router();
const probabilityController = require('../controllers/probabilityControllers');

router.post('/binomial', probabilityController.calcularBinomial);
router.post('/nominal', probabilityController.calcularNormal);
router.post('/uniforme', probabilityController.calcularUniforme);

module.exports = router;
// routes/normalRoute.js

