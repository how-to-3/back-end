// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './database/db.sqlite3'
    }
  },
  pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);  }
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
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './database/db.sqlite3'
    }
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);  }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
