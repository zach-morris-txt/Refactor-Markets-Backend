exports.seed = function(knex) {
    return knex("items").insert([
      { item_name: "Tomato", item_description: "red fruit", item_location: "Chad", item_price: 1, },
      { item_name: "Potato", item_description: "brown vegetable", item_location: "Sudan", item_price: 2, },
      { item_name: "Lemon", item_description: "yellow fruit", item_location: "Libya", item_price: 1, },
      { item_name: "Lime", item_description: "green fruit", item_location: "Egypt", item_price: 1, },
    ]);
};