# simple-nodejs

A simple (basic) node js app to be used as a container in docker and/or kubernetes.

# Summary

The idea was to have a simple "hello world!" app, that could be used to show this container details. 

Plus be able to allow for envars and config overwrites to help with understanding things like Secrets and ConfigMaps.

![image](pictures/Screenshot%202021-12-10%20214346.jpg)

# Usage

The following ENVVARS are available:

- PORT - port to listen on (3000)
- HOST - host IP to listen on (0.0.0.0)

- MESSAGE - message to display on the website

- CONFIG_RELOAD_INTERVAL - config reload time interval (5000 msecs) 

- DB_USERNAME - fake db admin username
- DB_PASSWORD - fake db password
- DB_HOST - fake db IP address
- DB_DB - fake db name

All these can be overwritten, HOST and PORT are important as they affect the container.  MESSAGE is the display string.

Note: that there is no database setup, it's just for being able to overwrite these and see the output in the browser.  DB_* changes affect nothing but the display.

## config file

The config file `config.js` is auto-loaded at a predetermined interval. 5 secs.  This is to allow for kubernetes configMap testing.

## default port

default port is HTTP/3000

## health check

There is a health check.  Added as an example of how to do this.

`wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1`

# Container usage

## docker

`docker run --rm -it -p 3000:3000 --name simple-nodejs mohclips/simple-nodejs`

## docker compose

see the [docker-compose.yml](docker-compose.yml) file

## kubernetes

TBA

# Docker Hub

[See this page on Docker Hub](https://hub.docker.com/repository/docker/mohclips/simple-nodejs)

`docker pull mohclips/simple-nodejs`
