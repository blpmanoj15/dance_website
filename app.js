// require('dotenv').config();
const express= require('express');
const path= require('path');
const fs=require('fs');
const app= express();

var mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = process.env.port || 8000;

//define mongoose schema
var contactSchema=new mongoose.Schema({
  name:String,
  phone:Number,
  email:String,
  address:String,
  desc:String,
});

var Contact=mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

 
// ENDPOINTS
app.get('/', (req, res)=>{
 
  const params = {}
  res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
 
  const params = {}
  res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send("This item has been saved to the database")
  }).catch(()=>{
  res.status(400).send("item was not saved to the databse")
})
});

app.get('/about' ,(req,res)=>{
        
  const params={} ;
  res.status(200).render("about.pug",params)
});
app.get('/classinfo' ,(req,res)=>{
  
  const params={} ;
  res.status(200).render("classinfo.pug",params)
});
app.get('/services' ,(req,res)=>{
  
  const params={} ;
  res.status(200).render("services.pug",params)
});


// START THE SERVER
app.listen(port, ()=>{
  console.log(`The application started successfully on port ${port}`);
});
