exports.seed = async function (knex, Promise) {
    await knex("roles").insert([
      { role_name: "owner", },
      { role_name: "admin", },
      { role_name: "client", },
      { role_name: "user", },
    ]);
};