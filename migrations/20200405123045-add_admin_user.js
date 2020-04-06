const bcrypt = require('bcrypt');
const { USER_ROLE } = require('../config/constants');
module.exports = {
  async up(db, client) {
    let password = '123456';
    const salt = await bcrypt.genSalt(process.env.SALT_WORK_FACTOR);
    password = await bcrypt.hash(password, salt);
    await db.collection('user').insertOne({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@test.com',
      userRole: USER_ROLE.ADMIN,
      password,
    })
  },

  async down(db, client) {
    await db.collection('user').deleteOne({email: 'admin@test.com'})
  }
};
