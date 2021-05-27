# IMDB REST API
[![N|Solid](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEX///8AAACfn5/y8vILCwvDw8M5OTnr6+twcHAuLi4RERE2Njbv7+/7+/srKyv39/fMzMxMTExSUlJBQUF/f3/b29sZGRleXl7S0tJ5eXkeHh7FxcXj4+O8vLywsLChoaFlZWVGRkaqqqqTk5McHByFhYWXl5dOTk5gYGBqampGFSmYAAACtElEQVR4nO2Y2ZKqMBBAwyIMS8I2ICKguIzj///gDcEsVoHCRYp56PNgZSk6h0DaBIQAAAAAAAAAAAAAAAAAAAAA4I+DfUnQNhiybmC13wiwcl2Qhx05Hog8TKB/P6gQqj3JnRr4W1lP8qf+JN7pVW50QVLidlj2ZAHD0h58IaRrEofGKgtZNzfP/W2TG1XsltPs0UI+KHBJEcrdlwIU94yXEjD3CFXmOwHNrWmQfAkBTUfopAr1C2iWv5QArZ8HBeTUuOFSAjHGv0MC5LDjY2qHpQSSwEiGBDxfzs73UgKOb5MXAjUvH5XV0goYZVr64xPSsEBRppcXAmKFbJ8Eyp+kuBTeLp8v4OahkgaGBWKsCNQ8XHGaLWBu1DQwTsAVr6ZWjJyDXoEu9pmlAdOcIKDyNUMgY8GPV1bOpgiYctKicS9irwBhgzYxKxcTBNyfSizdJvh/AYutP8J+EzJBoF2evH2OQNPI6dw6EwSSAO0/IRDtNMF1hECoCIjynHfgpvzr1KsIiAepZZtVBGQOJPkqAqnYDFrpiFXwcYHI9njrrVxFwIh569FeRQBfeet1HQGxHTXrIYHNsgL8/tx8pUfAk2tRDgmILTsVEOn3cwL8UObYQwIiW9MtmSogyrdZAr7HI/YKkEovlOvEoOq/YTxLAD/WYYx6BZSDSXsuEALuYS/OEvdR4w8JoCtv7BeQtCcjIaDuiPR5Aice5Z2AZ6sCkmzOppQKdMucjvpGwKVPQAo4cld8HHk2GRLoTlv0Nl4LkEM7Dk9KZn3iO8jt2EOa0Zjd1xVzh1DtMMgdIzsitBDZyI8Ja/RC0d/hWdGvXrIg6XHLuJcovztFVjS6MXJ8hNPH96WQxgrsjvZqvy34vEDBsp/BPlv1BPTTtBy3HQQAAAAAAAAAAAAAAAAAAACAFfgHk5s96skEU1cAAAAASUVORK5CYII=)](https://imdb3.herokuapp.com/api-docs/)

[![build status](https://img.shields.io/circleci/project/github/PokeAPI/pokeapi/master.svg)](https://imdb3.herokuapp.com/api/v1/) [![data status](https://img.shields.io/circleci/build/github/PokeAPI/api-data?label=data)](https://imdb3.herokuapp.com/api/v1/api-data)

## _Access metadata for some movies, TV series, actors, and directors.

This API  uses some open-source projects to work properly:

- [node.js] - evented I/O for the backend
- [Sequelize] - ORM for node.js apps
- [Express] - fast node.js network app framework

## Purpose
The purpose of this repo is to demonstrate some SQL modeling and querying techniques and decisions when using Sequelize ORM as a database.

## Installation

Requires [Node.js](https://nodejs.org/) v13+ to run.

Install the dependencies and devDependencies and start the server.

### Development
```sh
cd imdb
npm i
Create a database called classcenter CREATE DATABASE classcenter;
sequelize-cli db:seed:all
npx sequelize-cli db:migrate
npm run dev
```

### Production

```sh
npm install --production
NODE_ENV=production
npm start
```

## Plugins

| Plugin | README |
| ------ | ------ |
| Json Web Token | [plugins/jsonwebtoken/README.md][PlJw] |
| Bcryptjs | [plugins/bcryptjs/README.md][PlBc] |
| Sequelize | [plugins/googledrive/README.md][PlSq] |

## Docker

By default, the Docker will expose port 8000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd api-node
docker build -t <youruser>/api-node .
```

This will create the class center image and pull in the necessary dependencies.


Once done, you need to create a file called **env.list**

```sh
touch env.list
```

write your env vars into the file **env.list**, you might copy them from .env.example 

Finally run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

**Note:** You must run the following command where the env.list file is located

```sh
docker run -d -p 8000:8000 --env-file ./env.list --name=classcenter <youruser>/api-node
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
9
   [sequelize]: <https://github.com/sequelize/sequelize/blob/main/README.md>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>

   [PlJw]: <https://github.com/auth0/node-jsonwebtoken/blob/master/README.md>
   [PlBc]: <https://github.com/dcodeIO/bcrypt.js/blob/master/README.md>
   [PlSq]: <https://github.com/sequelize/sequelize/blob/main/README.md>
