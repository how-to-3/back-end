
exports.seed = function(knex) {
  return knex('steps').insert([
    {id: 1, step:"Create your seed files", step_number:1, guide_id:1},
    
    {id: 2, step:"After you run your migration files, then run the seeds! Boom done!", step_number:2, guide_id:1},

    {id: 3, step:"Try to compile all the list of changes at one time", step_number:1, guide_id:2},

    {id: 4, step:"Scour you code to make sure the endpoints and middleware will still function properly and not break ", step_number:2, guide_id:2},

    {id: 5, step:"Have a cool idea you want to try to implement", step_number:1, guide_id:3},

    {id: 6, step:"Break everything while trying to implement it, weep sad programmer tears as your revert to your last commit", step_number:2, guide_id:3},
  ]);
};
