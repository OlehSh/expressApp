
module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@test.com',
      password: '123456'
    })
  },

  async down(db, client) {
    await db.collection('users').deleteOne({email: 'admin@test.com'})
  }
};
