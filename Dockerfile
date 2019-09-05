FROM node:10-alpine
ARG deploy_env='dev'
RUN npm install -g @angular/cli@8.2.0
WORKDIR /web

COPY . .
RUN rm -rf node_modules/*
RUN npm install

ENV DEPLOY_ENV ${deploy_env}

RUN ng build --configuration $DEPLOY_ENV

FROM nginx:1.14-alpine

RUN apk update && apk add tcpdump vim htop

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=0  /web/dist/ .

EXPOSE 8080