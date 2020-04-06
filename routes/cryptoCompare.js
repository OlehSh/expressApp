const router  = require('express').Router();
const { getSinglePrice } = require('../controllers/cryptocompareController');
const { checkSinglePriseRequest } = require('../validators/cryptoCompareValidator');
const { validateErrors } = require('../middleware/valedateErrors');

router.get('/single-price', checkSinglePriseRequest, validateErrors, getSinglePrice);

module.exports = router;
