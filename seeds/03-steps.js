
exports.seed = function(knex) {
  return knex('steps').insert([
    {id: 1, step:"Step 1", step_number:1, guide_id:1},
    {id: 2, step:"Step 2", step_number:2, guide_id:1},
    {id: 3, step:"Step 1", step_number:1, guide_id:2}
  ]);
};
