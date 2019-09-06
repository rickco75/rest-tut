const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

app.use(cors());

app.use(bodyParser.json());

//connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true }, () => {
    console.log('connected to DB!')
});

var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("Server is running on port: " + port);
});


//import routes
const postsRoute = require('./routes/posts');

app.use('/posts',postsRoute);

//MIDDLEWARE
app.use('/posts', (req,res) =>{
    console.log('hit the posts route');
   // res.send('welcome to posts')
});




app.listen(3000);

