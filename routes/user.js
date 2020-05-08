const router = require('express').Router();
const {
  getUsers,
  deleteUser,
  updateUser,
  getUser,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/userController');
const { validateErrors } = require('../middleware/valedateErrors');
const { checkUserId, checkUpdateUser } = require('../validators/userValidator');
const { auth, checkUserExists } = require('../lib/auth');
const { permit, accessLevels } = require('../lib/permit');

router.get(
  '/',
  auth.required,
  checkUserExists,
  permit(accessLevels.ADMIN),
  validateErrors,
  getUsers,
);
router.get(
  '/me',
  auth.required,
  checkUserExists,
  permit(accessLevels.ALL),
  validateErrors,
  getProfile,
);
router.get(
  '/:id',
  auth.required,
  checkUserExists,
  permit(accessLevels.ADMIN),
  validateErrors,
  getUser,
);
router.put('/me', auth.required, checkUserExists, permit(accessLevels.ALL), validateErrors, updateProfile);
router.put('/:id', auth.required, checkUserExists, permit(accessLevels.ADMIN), checkUserId, checkUpdateUser, validateErrors, updateUser);
router.delete('/me', auth.required, checkUserExists, permit(accessLevels.USER), validateErrors, deleteProfile);
router.delete('/:id', auth.required, checkUserExists, checkUserId, permit(accessLevels.ADMIN), validateErrors, deleteUser);

module.exports = router;
