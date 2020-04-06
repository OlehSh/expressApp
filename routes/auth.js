const router  = require('express').Router();
const { signIn, signOut, signUp } = require('../controllers/authController');
const { validateErrors } = require('../middleware/valedateErrors');
const auth = require('../lib/auth')
const { checkCreateUser } = require('../validators/authValidator')
router.post('/sign-up', checkCreateUser, auth.optional, validateErrors, signUp);
router.post('/sign-in', auth.optional, validateErrors, signIn);
router.get('/sign-out', auth.required, validateErrors, signOut);

module.exports = router;
