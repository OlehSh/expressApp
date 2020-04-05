const router  = require('express').Router();
const { signIn, signOut } = require('../controllers/auth');

router.get('/single-price/:from', getSinglePrice);

module.exports = router;
