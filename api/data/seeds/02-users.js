exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "Anastasia",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      email: "Ana@gmail.com",
    },
    {
      username: "Vasilii",
      password: "$3a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      email: "Vas@gmail.com",
    },
    {
      username: "Johanna",
      password: "$4a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      email: "Joh@gmail.com",
    },
    {
      username: "Zach",
      password: "$5a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      email: "Zac@gmail.com",
    },
  ]);
};