// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/db.sqlite3'
    }
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);  
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/testing.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: { 
      directory: './seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);  }
    },
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/production.sqlite3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);  }
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: { 
      directory: './seeds'
    },
  }
};
