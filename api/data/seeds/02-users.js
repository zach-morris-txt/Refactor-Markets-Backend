exports.seed = async function (knex, Promise) {
  await knex("users").insert([
    {
      username: "Anastasia",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    },
    {
      username: "Vasilii",
      password: "$3a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    },
    {
      username: "Johanna",
      password: "$4a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    },
    {
      username: "Zach",
      password: "$5a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    },
  ]);
};