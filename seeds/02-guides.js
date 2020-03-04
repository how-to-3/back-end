
exports.seed = function(knex) {
  return knex('guides').insert([
    {
      id: 1, 
      guide_name: 'How To Seed Your Database', 
      user_id: 1,
      category:"Programming",
      img_url: 'https://picsum.photos/200',
      score: 3,
      description: 'A guide on creating seed data for your front-end developers!'
    },
    {
      id: 2, 
      guide_name: 'How To Alter Your Database', 
      user_id: 2,
      category: "Programming",
      img_url: 'https://picsum.photos/200',
      score: 7,
      description: 'Indecisive? This guide is all about handling the additional work load you put on yourself!'
    },
    {
      id: 3, 
      guide_name: 'How To Break Your Database', 
      user_id: 3,
      category: "Programming",
      img_url: 'https://picsum.photos/200',
      score: 5,
      description: 'Have you ever wanted to do some extra? Get creative? Go above and beyond?'
    }
  ]);
};
