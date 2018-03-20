// Code by Badruddin Kamal for qantas technical test

const express = require('express')
const app = express()

const Validate = require('./validate');
const Function = require('./function');

// Validate request key should be Oauth token, missing https implementation
app.all('/*', function(req, res, next) {
    if(Validate.validateRequest(req)){
        next();
    }
    res.status(403).send('Forbidden')
});

// Create user
app.post('/create', function (req, res) {
    Function.createUser(req, res);
});

// Update user
app.post('/update', function (req, res) {
    Function.updateUser(req, res);
});

// Delete user
app.post('/delete', function (req, res) {
    Function.deleteUser(req, res);
});

// Show user
app.post('/show', function (req, res) {
    Function.showUser(req, res);
});

// Start server
app.listen(3000, () => console.log('App listening on port 3000!'))