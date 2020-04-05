const router  = require('express').Router();
const { signIn, signOut, signUp } = require('../controllers/auth');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);

module.exports = router;
