const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_reddit_db',
  password: 'Mr.PostgreSQL100%',
  port: 5432,
});

module.exports = pool;
