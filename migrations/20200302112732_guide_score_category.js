
exports.up = async function(knex) {
  await knex.schema.table('guides', table => {
    table.string('category', 255)
    table.integer('score')
    table.string('img_url')
    table.string('description')
      
  });
};

exports.down = async function(knex) {
  await knex.schema.table('guides', table => {
    table.dropColumn('description')
    table.dropColumn('img_url')
    table.dropColumn('score')
    table.dropColumn('category')
  })
};
