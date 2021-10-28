//Export Up
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('user_id') //Primary Key
        tbl.string('username', 100).notNullable().unique()
        tbl.string('password', 100).notNullable()
        tbl.string('email', 100).notNullable().unique()
    })

    .createTable('items', tbl => {
        tbl.increments('item_id') //Primary Key
        tbl.string('item_name', 100).notNullable()
        tbl.string('item_description', 200).notNullable()
        tbl.string('item_location', 100).notNullable()
        tbl.integer('item_price', 32).notNullable()
    })

    .createTable('users_items', table => {
        table.increments('ui_id') //Primary Key
        table.integer('item_id') //Foreign Key
            .unsigned()
            .notNullable()
            .references('item_id')
            .inTable('items')
            .onDelete('CASCADE')
        table.integer('user_id') //Foreign Key
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')      
    })
};


//Export Down
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users_items')
    .dropTableIfExists('items')
    .dropTableIfExists('users')
}
