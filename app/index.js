// Load modules
const express = require('express')
const os = require('os');

const db_config = require('./config/db'); 
const app_config = require('./config/app'); 

const view_config_file = './config/view'
var view_config = require(view_config_file); // var as we are going to auto-reload later on

// bring in config from file (in msecs)
const configUpdateInterval = process.env.CONFIG_RELOAD_INTERVAL || 5000

// roll up all the config files
var config = {
  app: app_config,
  db: db_config,
  view: view_config
}

// "hack" to auto-reload view_config at 'interval' to allow for updates via configMap changes
setInterval(() => {
  console.log('reloading config')
  delete require.cache[require.resolve(view_config_file)];
  view_config = require(view_config_file)

  config = {
    app: app_config,
    db: db_config,
    view: view_config
  }
  console.debug(config)
}, configUpdateInterval)
// everything is loaded into 'config' eg. config.app.port

// debug - dump all env vars
console.debug(process.env)
// debug - dump config
console.debug(config)

// init web app
var app = express()

// set template engine for html
app.set('view engine', 'pug')

// Define request response in root URL (/)
app.get('/', function (req, res) {
  
  res.render('index', { 
    title: 'Simple Dockerized Node App', 
    message: config.view.message,
    os: os,
    db: config.db,
    app: config.app
  })

  // log the client headers
  console.log(req.headers)
})

// noddy health check
app.get('/health', function (req, res) {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
})

//Launch listening server
app.listen(config.app.port, config.app.host, function () {
  console.log(`app listening on host ${config.app.host} on port ${config.app.port}!`)
})
