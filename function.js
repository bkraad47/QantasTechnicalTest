
const Validate = require('./validate');
const uniqid = require('uniqid');
const Promise = require('bluebird');

// The credentials should be generated  from environment however for now we will ignore that and use this freeDB
// Also dbScript.sql must be run to create schema and we will not use knex in this case to create the schema
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sql12.freemysqlhosting.net',
      user : 'sql12227835',
      password : 'QFixJCPH4E',
      database : 'sql12227835'
    }
});

// Create user
const createUser = (req,res) =>{
    // Simple content validation
    var dateReg = /^\d{4}-\d{2}-\d{2}$/;
    if(Validate.validateRequestBody(req.body, ["firstName", "lastName", "birthDate"]) && req.body.birthDate.match(dateReg)){
            var id = uniqid();
            knex('USER').insert({id: id, firstName: req.body.firstName, lastName: req.body.lastName, birthDate: req.body.birthDate})
            .then(function () {
                if(req.body.info !== undefined){
                    var infoPromises = req.body.info.map(function(info){
                        return knex('USER_INFO').insert({id: id, type: info.type, text: info.text}); 
                    });
                    Promise.all(infoPromises).then(function(){
                        res.send("User successfully added with id: " + id);
                    }).catch(function(error){
                        console.log(error);
                        res.status(500).send('Internal Service Error');
                    });
                }else{
                    res.send("User successfully added with id: " + id);
                }
            }).catch(function(error){
                console.log(error);
                res.status(500).send('Internal Service Error');
            });
    }else{
        res.status(500).send('Invalid Request');
    }
};
module.exports.createUser = createUser;

// Update user
const updateUser = (req,res) =>{
        // Simple content validation
        var dateReg = /^\d{4}-\d{2}-\d{2}$/;
        if(Validate.validateRequestBody(req.body, ["id"]) && (req.body.birthDate.match(dateReg) || req.body.birthDate === undefined)){
                var userObj = Object.assign({}, req.body);
                delete userObj.info;
                knex('USER').where('id',userObj.id).update(userObj)
                .then(function () {
                    if(req.body.info !== undefined){
                        var infoPromises = req.body.info.map(function(info){
                            return knex('USER_INFO').where({id: req.body.id,type: info.type }).select('*').then(function(result){
                                if(result.length > 0){
                                    return knex('USER_INFO').where({id: req.body.id}).update(info);
                                }else{
                                    return knex('USER_INFO').insert({id: req.body.id, type: info.type, text: info.text})
                                }
                            });
                        });
                        Promise.all(infoPromises).then(function(){
                            res.send("User successfully updated with id: " + req.body.id);
                        }).catch(function(error){
                            console.log(error);
                            res.status(500).send('Internal Service Error');
                        });
                    }else{
                        res.send("User successfully added with id: " + id);
                    }
                }).catch(function(error){
                    console.log(error);
                    res.status(500).send('Internal Service Error');
                });
        }else{
            res.status(500).send('Invalid Request');
        }
};
module.exports.updateUser = updateUser;

// Delete user
const deleteUser = (req,res) =>{
    if(Validate.validateRequestBody(req.body, ["id"])){
            knex('USER').where('id', req.body.id).del()
            .then(function () {
                    return knex('USER_INFO').where('id', req.body.id).del().then(function(){
                        res.send("User successfully deleted with id: " + req.body.id);
                    }).catch(function(error){
                        console.log(error);
                        res.status(500).send('Internal Service Error');
                    });
            }).catch(function(error){
                console.log(error);
                res.status(500).send('Internal Service Error');
            });
    }else{
        res.status(500).send('Invalid Request');
    }
};
module.exports.deleteUser = deleteUser;

// Show user
const showUser = (req,res) =>{
    if(Validate.validateRequestBody(req.body, ["id"])){
        knex('USER').where('id', req.body.id).select('*').then(function(result){
            var userObj = {
                id: result[0].id,
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                birthDate: result[0].birthDate
            };
            return knex('USER_INFO').where('id', req.body.id).select('*').then(function(result){
                var info = result.map(function(data){
                    return {type: data.type,text: data.text};
                });
                userObj.info = info;
                return  userObj;
            });
        }).then(function(response){
            res.send(response);
        }).catch(function(error){
            console.log(error);
            res.status(500).send('Internal Service Error');
        });
    }else{
        res.status(500).send('Invalid Request');
    }
};
module.exports.showUser = showUser;

