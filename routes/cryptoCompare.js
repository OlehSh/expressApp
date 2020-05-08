const router = require('express').Router();
const { getSinglePrice } = require('../controllers/cryptocompareController');
const { checkSinglePriseRequest } = require('../validators/cryptoCompareValidator');
const { validateErrors } = require('../middleware/valedateErrors');
const { auth, checkUserExists } = require('../lib/auth');
const { permit, accessLevels } = require('../lib/permit');

router.get('/single-price', auth.required, checkUserExists, permit(accessLevels.ALL), checkSinglePriseRequest, validateErrors, getSinglePrice);

module.exports = router;
