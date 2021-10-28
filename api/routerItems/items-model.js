//Imports
const db = require('../data/db-config')


//DATABASE FUNCTIONS
function findAll() {
    return db('items as i')
    .leftJoin('user_items as ui', 'i.item_id', 'ui.item_id')
    .leftJoin('users as u', 'ui.user_id', 'u.user_id')
    .select(
        'i.*',
        'u.user_id as item_owner_id',
        'u.username as item_owner'
    )
}

function findBy(filter) {
    return db('items as i')
    .where(filter)
    .orderBy('item_id')
}

function findById(item_id) {
    return db('items as i')
    .leftJoin('user_items as ui', 'i.item_id', 'ui.item_id')
    .leftJoin('users as u', 'ui.user_id', 'u.user_id')
    .select(
        'i.*',
        'u.user_id as item_owner_id',
        'u.username as item_owner'
    )
    .where('i.item_id', item_id)
    .first()
}

async function addItem(item, user_id) {
    const [item_id] = await db('items').insert(item, 'item_id')
    await db('user_items').insert({item_id: item_id, user_id:user_id.user_id})
    return db('items').where({item_id}).first()
}

function update(item_id, item) {
    return db('items').where({item_id}).update(item)
}

function remove(item_id) {
    return db('items').where({item_id}).del()
}


//Exports
module.exports = {
    findAll,
    findBy,
    findById,
    addItem,
    update,
    remove
}