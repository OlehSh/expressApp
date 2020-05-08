const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use('local-internal', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !await user.validatePassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, user);
  } catch (err) {
    throw done(err, null);
  }
}));
