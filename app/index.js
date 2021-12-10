// Load modules
const express = require('express')
const os = require('os');
var config = require('./config'); // var as we are going to reload later on

// bring in config from file (in msecs)
const configUpdateInterval = process.env.CONFIG_RELOAD_INTERVAL || 5000

// "hack" to auto-load config at 'interval' to allow for config updates via configMap
setInterval(() => {
  console.log('reloading config')
  delete require.cache[require.resolve('./config')];
  config = require('./config')
}, configUpdateInterval)
// everything is loaded into 'config' eg. config.app.port

// debug - dump all env vars
console.debug(process.env)

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
