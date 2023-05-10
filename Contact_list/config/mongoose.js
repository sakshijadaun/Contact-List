//require library
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://127.0.0.1/contact_list_db');

//acquire the connection(whether it is sucessfull or not)
 const db = mongoose.connection;
 
 //Print Error
 db.on('err', function(err){
    console.log(err, mongoose);
 })
 
 //Up and running and then print the message
 db.once('open', function(){
    console.log('Sucessfully conect to db');
 })
