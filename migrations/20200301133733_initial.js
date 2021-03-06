
exports.up = async function(knex) {
  await knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 255)
      .notNullable()
      .unique();
    users.string('password', 255).notNullable();
  });

  await knex.schema.createTable('guides', guides => {
    guides.increments();

    guides
      .string('guide_name', 255)
      .notNullable()
      .unique();
    guides.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  });

  await knex.schema.createTable('steps', steps => {
    steps.increments();

    steps
      .string('step', 255)
      .notNullable()
    steps.integer("guide_id")
        .notNullable()
        .references("id")
        .inTable("guides")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    steps.integer("step_number")
  });

};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('steps');
    await knex.schema.dropTableIfExists('guides');
    await knex.schema.dropTableIfExists('users');
};
