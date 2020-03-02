
exports.up = async function(knex) {
  await knex.schema.table('guides', table => {
    table.string('category', 255)
    table.integer('score')
  });
};

exports.down = async function(knex) {
  await knex.schema.table('guides', table => {
      table.dropColumn('category')
      table.dropColumn('score')
  })
};
