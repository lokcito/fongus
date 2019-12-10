// server.js
// where your node app starts

// init project
var express = require('express');
var mongoose = require('mongoose');
var taskModel = require('./models/task.js')
var config = require('./config/database.js');
var app = express();
mongoose.connect(config.connection, {useNewUrlParser: true, useUnifiedTopology: true});  
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//GET: tasks/by/name.json
//GET: tasks/by/name.json?name=zi
//GET: tasks/by/name.json?name=zix
app.get('/tasks/by/name.json', function(req, res){
  var query = req.query.name;
  
  taskModel.find().byName(query).exec(function(err, tasks) {
    if(err) {
      res.send({
        status: false
      });
    }

    return res.status(200).send({
      status: true,
      objects: tasks
    });    
  });  
});

app.get('/tasks.json', function(req, res){
  // const kitty = new taskModel({ name: 'Zildjian'});
  // kitty.save().then(() => console.log('meow'));
  // res.send("okc");
  taskModel
    .find({})
    .exec(function (dbErr, modelDoc){
         if(dbErr) {
          res.send({
            status: false
          });
         }
          
          return res.status(200).send({
            status: true,
            objects: modelDoc
          })
     });
});


app.get('/connection.json', function(request, response) {
  mongoose.connect('mongodb+srv://root:0root0@cluster0-czd9j.mongodb.net/bichito_db?retryWrites=true&w=majority', function(err, db) {
    if (err) {
      response.send({
        status: false,
        meta: {
          msg: "" + err
        }
      });
    } else {
      response.send({
        status: true,
      });      
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
