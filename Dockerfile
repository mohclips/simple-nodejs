# Dockerfile
FROM node:17.2.0-alpine3.12

ENV NODE_VERSION 17.2.0


# install deps, create folder and user
RUN apk add --update tini \
    &&  mkdir -p /opt/app \
    && adduser -S app

# setup for app usage
WORKDIR /opt/app
COPY app /opt/app

# run installer
RUN npm install \
    && chown -R app /opt/app

# set app process user (non-root)
USER app

# comment for default port (not actually published)
EXPOSE 3000

# args for tini, that run "node index.js" as you would at the CLI
CMD ["--", "node", "index.js"]
# we use tini so that it works properly with preocess Signals eg. CTRL+C when run from CLI
ENTRYPOINT ["/sbin/tini"]
