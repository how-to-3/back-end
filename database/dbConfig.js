const knex = require("knex");

const { DB_ENV } = require('../utils/secrets.js');

const knexfile = require("../knexfile.js");

module.exports = knex(knexfile[DB_ENV]);