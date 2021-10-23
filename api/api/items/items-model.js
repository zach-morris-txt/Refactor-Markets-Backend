    //Still Need;
//ADJUST FOR POSTGRES
//updateItemById, createItem, deleteItem


//Imports
const db = require('../../data/db-config')


//DATABASE FUNCTIONS
function getItems() { 
    return db("items")
}


function getItemById(item_id) {
    return db("items")
    .where({item_id})

}

function updateItemById(item_id,changes) {
    return db('items')
    .where({ item_id })
    .update(changes, '*');
    return getItemById(item_id);
}
async function createItem(payload) {
    const id = await db('items').insert(payload).returning("item_id");

    return getItemById(parseInt(id));
}


function deleteItem(item_id) {
    return db('items')
    .where({ item_id })
    .del();
}

// //Exports; Exposing
module.exports = {
    getItems,
    getItemById,
    updateItemById,
    createItem,
    deleteItem,
}