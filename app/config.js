// config.js

module.exports = {
    app: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || "0.0.0.0",
    },
    db: {
      username: process.env.DB_USERNAME || 'db_admin',
      password: process.env.DB_PASSWORD || 'db_secret_pass',
      host: process.env.DB_HOST || '192.168.0.10',
      database: process.env.DB_DB || 'all_the_secret_stuff'
    },
    view: {
        message: process.env.MESSAGE || "Hello there sunshine!"
    }
  }
