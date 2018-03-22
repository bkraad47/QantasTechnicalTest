# QantasTechnicalTest
Author Badruddin Kamal(Fusion Professionals) 2018

Middleware to create, update, delete and show user information


## Installation

1. Currently pointing to a free mysql database, however the variables need to be moved to the environment in `function.js`, then run the scripts in `dbScript.sql`, if not you can use the test db. 
2. Download the GIT Repository
3. In the directory run the command `npm install` to install all dependencies
4. Make sure port `3000` is free on your machine
5. To start the server run the command `node index.js`


## Swagger Instructions

To check Swagger information start the server and visit `http://localhost:3000/api-docs`


## Default API Key

`1234`


## Accepted Date Format

`YYYY-MM-DD`

## Missing Options

1. OAuth - Tokens
2. Https
3. Moving the db credentials to the environment
4. Unit testing or Test-driven (As it is a simple app this has been avoided)

Some instructions for this are available in my blog https://www.linkedin.com/pulse/expressjs-https-firebase-auth-restful-webservices-framework-kamal/


## Node Packages Used
- Express
- Bluebird
- Body-parser
- Knex
- Mysql
- Swagger-ui-express
- Uniqid
