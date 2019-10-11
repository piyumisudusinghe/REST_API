//import the framework for node
const express = require('express');

//body parser makes the request such that we can access it (req.body)
const bodyParser = require('body-parser');

//create a express app
const app = express();

//extended=falseis a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays. The extended version allows more data flexibility, but it is outmatched by JSON. 
app.use(bodyParser.urlencoded({extended:true}))

//send a json body parser to app
app.use(bodyParser.json())



//connecting to the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//conneting to the database via mongoose
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(() => {
    console.log("Successfully connet to the database");
}).catch(err =>{
    console.log("Could not connect to the database, Error : ",err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

//get the routes
require('./app/routes/user.routes.js')(app);

//define the port
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

