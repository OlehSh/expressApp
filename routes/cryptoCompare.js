const router  = require('express').Router();
const { getSinglePrice } = require('../controllers/cryptocompareController');

router.get('/single-price/:from', getSinglePrice);

module.exports = router;
