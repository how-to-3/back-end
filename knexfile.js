// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { 
      filename: './db/auth.db3' 
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: { 
      directory: './db/seeds' 
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './db/testing.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: { 
      directory: './db/seeds'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
