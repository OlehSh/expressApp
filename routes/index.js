const { Router } = require('express');
const indexController = require('../controllers/indexController');
const cryptocompareController = require('../controllers/cryptocompareController');

const router = Router();
router.get('/', indexController.fetch);

//crypto Currency
router.get('/crypto/single-price/:from', cryptocompareController.getSinglePrice);
module.exports = router;
