//Tut-75
const express = require('express'); //Importing the express methods!
const path = require('path');
const app = express(); // Creating a Express App!
const mongoose = require('mongoose');
const bodyparser = require("body-parser"); 
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true }); // DataBase Store
const port = 80; // Its App run on port 80!


//Define Mongoose Schema!
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    gender: String

});

var Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF!!
app.use('/static', express.static('static')); //<--For serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF!!
app.set('view engine', 'pug'); //<--Set The Template Engine as pug!
app.set('views', path.join(__dirname, 'views')); //<--Set the views directory

//Our Pug ENDPOINT  <--app.get-->
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug')
});


// START THE SERVER-->
app.listen(port, () => { //Port listen!
    console.log(`The application started successfully on port ${port}`)
});