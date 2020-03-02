
exports.seed = async function(knex) {
  await knex("steps").truncate()
  await knex("guides").truncate()
  await knex("users").truncate()
};
