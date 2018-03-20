
const Validate = require('./validate');
// The credentials should be generated  from environment however for now we will ignore that and use this free DB
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sql12.freemysqlhosting.net',
      user : ' sql12227835',
      password : 'QFixJCPH4E',
      database : 'sql12227835',
      port : 3306
    }
});



// Create user
const createUser = (req,res) =>{
};
module.exports.createUser = createUser;

// Update user
const updateUser = (req,res) =>{
};
module.exports.updateUser = updateUser;

// Delete user
const deleteUser = (req,res) =>{
};
module.exports.deleteUser = deleteUser;

// Show user
const showUser = (req,res) =>{
};
module.exports.showUser = showUser;

