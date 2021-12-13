// db.js

module.exports = {
      username: process.env.DB_USERNAME || 'db_admin',
      password: process.env.DB_PASSWORD || 'db_secret_pass',
      host: process.env.DB_HOST || '192.168.0.10',
      database: process.env.DB_DB || 'all_the_secret_stuff'
  }
