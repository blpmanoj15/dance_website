//require the library
const mongoose= require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contact')
//acquire the connection to chek if it is successfull
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connecting to db'));
//up and running then print the message
db.once('error',function(){
  console.log('Successfully connected to db');
});

