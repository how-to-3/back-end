
exports.seed = function(knex) {
  return knex('guides').insert([
    {id: 1, guide_name: 'How To Seed Your Database', user_id:1,category:"Programming"},
    {id: 2, guide_name: 'How To Feed Your Database', user_id:2,category:"Programming"},
    {id: 3, guide_name: 'How To Water Your Database', user_id:3,category:"Programming"}
  ]);
};
