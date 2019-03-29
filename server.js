const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://jacob:jacob@cluster0-qwsrk.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "PeachyKeen";
const USER_COLLECTION = "User";
var db;
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/profile/:email', function (req, res) {
    var prof_id = req.params.email;
    //request.query : for query string params
    //res.send(getProfile(prof_id));
    getProfile(prof_id, function(response){
	   console.log(response);
        res.send(response);
    });
});

function getProfile(email, callback) {
  var res;
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { email: email };
  console.log(searchTerm);
  dbo.collection(USER_COLLECTION).find(searchTerm).toArray(function(err, result) {
    if (err) throw err;
      res =  result;
    return callback(res[0]);
  });
}

//to create users profile
app.post('/profile', function (req, res) {
  const new_prof = {
       name: req.body.name, // name
       password:req.body.password, // password
       email: req.body.email, // email
  };

  AddProfile(new_prof,function(response){
	   console.log(response);
      res.send(response);
  });
});

function AddProfile(new_prof, callback){
  var dbo = db.db(DATABASE_NAME);
  dbo.collection(USER_COLLECTION).insertOne(new_prof, function (err, result) {
    if (err)
      return callback('Error');
    else
      return callback('Success');
    });
}

MongoClient.connect(CONNECTION_URL, function (err, database) {
   if (err)
   	throw err
   else
   {
	    db = database;
	    console.log('Connected to MongoDB');
	//Start app only after connection is ready
	    app.listen(port, () => console.log(`App listening on port ${port}!`))
   }
 });

//*********************************************************************************************//
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
