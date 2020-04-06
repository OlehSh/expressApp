module.exports = {
  async up(db, client) {
    await db.createCollection('user')
  },
  async down(db, client) {
    await db.collection('user').drop()

  }
};
