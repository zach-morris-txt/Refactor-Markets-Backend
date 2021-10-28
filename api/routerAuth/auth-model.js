//Imports
const db = require('../data/db-config')


//DATABASE FUNCTIONS
function findAll() {
  return db('users').select('user_id', 'username', 'email')
}

function findBy(filter) {
  return db('users').where(filter).orderBy('user_id')
}

function findById(user_id) {
  return db('users').select('user_id', 'username', 'email').where({user_id}).first()
}

function findItemsById(user_id) {
  return db('items as i')
  .leftJoin('user_items as ui', 'i.item_id', 'ui.item_id')
  .leftJoin('users as u', 'ui.user_id', 'u.user_id')
  .select('i.*')
  .where('u.user_id', user_id)
}

async function addUser(user) {
  const [user_id] = await db('users').insert(user, 'user_id')
  return db('users').where({user_id}).first()
  // return db('users').where({user_id}).select('user_id', 'username', 'email').first()
}

function update(user_id, user) {
  return db('users').where(user_id).select('user_id', 'username', 'email').update(user)
}

function remove(user_id) {
  return db('users').where({user_id}).del()
}


//Exports
module.exports = {
  findAll,
  findBy,
  findById,
  findItemsById,
  addUser,
  update,
  remove
}
