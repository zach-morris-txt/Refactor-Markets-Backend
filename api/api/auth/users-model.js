    //Still Need;
//ADJUST FOR POSTGRES


//Imports
const db = require('../../data/db-config')


//DATABASE FUNCTIONS
function find() {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name");
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "u.password", "r.role_name")
    .where(filter);
}

function findById(user_id) {
  // return
  console.log(user_id)

  const test = db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "u.password", "r.role_name")
    .where({user_id})
    .first();
    return test
}

async function add({ username, password, role_name }) {
  let created_user_id
  await db.transaction(async trx => {
    let role_id_to_use
    const [role] = await trx('roles').where('role_name', role_name)
    if (role) {
      role_id_to_use = role.role_id
    } else {
      const role_id = await trx('roles').insert({ role_name: role_name }).returning("user_id")
      role_id_to_use = role_id
    }
    const user_id = await trx('users').insert({ username, password, role_id: role_id_to_use }).returning("user_id");
    created_user_id = user_id[0]

  })
  return findById(created_user_id)
}


//Exports; Exposing
module.exports = {
    find,
    findBy,
    findById,
    add,
}