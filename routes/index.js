const { Router } = require('express');
const indexController = require('../controllers/indexController');
const cryptocompareRouter = require('./cryptoCompare');
const authRouter = require('./auth');


const router = Router();
router.get('/', indexController.fetch);
router.use('/crypto', cryptocompareRouter)
router.use('/auth', authRouter)

module.exports = router;
