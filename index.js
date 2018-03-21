// Code by Badruddin Kamal for qantas technical test

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const Validate = require('./validate');
const Function = require('./function');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 // Simple logger
const log = (req, res, next)=>{
    console.log("Request: " + req.originalUrl + " Body: " + JSON.stringify(req.body));
    next();
};
app.use(log);

// Validate request key should be Oauth token, missing https implementation
app.all('/user/*', function(req, res, next) {
    if(Validate.validateRequest(req)){
        next();
    }else{
        res.status(403).send({error: 403, message:'Forbidden'});
    }
});

// Create user
app.post('/user/create', function (req, res) {
    Function.createUser(req, res);
});

// Update user
app.post('/user/update', function (req, res) {
    Function.updateUser(req, res);
});

// Delete user
app.post('/user/delete', function (req, res) {
    Function.deleteUser(req, res);
});

// Show user
app.post('/user/show', function (req, res) {
    Function.showUser(req, res);
});

// Swaager
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
app.listen(3000, () => console.log('App listening on port 3000!'))