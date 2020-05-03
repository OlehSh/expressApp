const { Router } = require('express');
const indexController = require('../controllers/indexController');
const cryptocompareRouter = require('./cryptoCompare');
const authRouter = require('./auth');
const userRouter = require('./user');


const router = Router();
router.get('/', indexController.fetch);
router.use('/crypto', cryptocompareRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router;
