const router  = require('express').Router();
const { signIn, signUp } = require('../controllers/authController');
const { validateErrors } = require('../middleware/valedateErrors');
const { checkCreateUser } = require('../validators/authValidator')
router.post('/sign-up', checkCreateUser, validateErrors, signUp);
router.post('/sign-in', validateErrors, signIn);

module.exports = router;
