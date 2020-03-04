
exports.seed = function(knex) {
  return knex('users').insert([
    {id: 1, username:"testAcc", password:"test"},
    {id: 2, username:"seedAcc1", password:"password"},
    {id: 3, username:"seedAcc2", password:"password"}
  ]);
};
