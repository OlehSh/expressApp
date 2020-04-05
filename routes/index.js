const { Router } = require('express');
const indexController = require('../controllers/indexController');
const cryptocompareRouter = require('./cryptoCompare');


const router = Router();
router.get('/', indexController.fetch);
router.use('/crypto', cryptocompareRouter)

module.exports = router;
