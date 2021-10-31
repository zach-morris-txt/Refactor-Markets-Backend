exports.seed = function(knex) {
    return knex("items").insert([
      { item_name: "Tomato", item_description: "red fruit", item_location: "Chad" },
      { item_name: "Potato", item_description: "brown vegetable", item_location: "Sudan" },
      { item_name: "Lemon", item_description: "yellow fruit", item_location: "Libya" },
      { item_name: "Lime", item_description: "green fruit", item_location: "Egypt" },
    ]);
};