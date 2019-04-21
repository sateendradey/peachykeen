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
const RESTAURANT_COLLECTION = "Restaurant";
var db;
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////GET PROFILE FROM EMAIL
app.get('/profiles/:email', function (req, res) {
  var prof_id = req.params.email;
  //request.query : for query string params
  //res.send(getProfile(prof_id));
  getProfile(prof_id, function(response){
    if (response)
    res.send(response);
    else {
      res.status(404).send("Not Found");
    }
  });
});

function getProfile(email, callback) {
  var res;
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { email: email };
  dbo.collection(USER_COLLECTION).findOne(searchTerm, function(err, result) {
    if (err) throw err;
    else if (!result)
    res = null;
    else{
      res =  result;
    }
    return callback(res);
  });
}
////////GET PROFILE FROM EMAIL ENDDDD

////////GET ALL RESTAURANTS
app.get('/restaurants',function (req, res){
  var dbo = db.db(DATABASE_NAME);
  dbo.collection(RESTAURANT_COLLECTION).find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
////////GET ALL RESTAURANTS ENDDDD


////////CREATE NEW PROFILE
app.post('/profile', function (req, res) {
  const new_prof = {
    name: req.body.name, // name
    password:req.body.password, // password
    email: req.body.email, // email
    date: req.body.date,
    Reviews: req.body.Reviews,
    Reserve: req.body.Reserve
  };

  AddProfile(new_prof,function(response){
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
////////CREATE NEW PROFILE ENDDDDD

////////GET DATA FOR ONE RESTAURANT
app.get('/restaurants/:id',function (req, res){
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { id: parseInt(req.params.id) };
  dbo.collection(RESTAURANT_COLLECTION).findOne(searchTerm, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
////////GET DATA FOR ONE RESTAURANT ENDDDDDDD
////////GET DATA FOR ONE RESTAURANT BY NAME
app.get('/restaurantName/:name',function (req, res){
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { Name: req.params.name };
  dbo.collection(RESTAURANT_COLLECTION).findOne(searchTerm, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
////////GET DATA FOR ONE RESTAURANT BY NAME ENDDDDDDD

////////SET REVIEW FOR ONE RESTAURANT
app.post('/restaurant/review/:id',function (req, res){
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { id: parseInt(req.params.id) };
  const updateReviews = {
    user_id: req.body.user_id, // name
    user_name:req.body.user_name, // password
    review: req.body.review,
    date: req.body.date
  };
  //update the reviews in the restaurant collection
  dbo.collection(RESTAURANT_COLLECTION).updateOne(searchTerm, {$addToSet: {Reviews: updateReviews}}, function(err, result) {
    if (err)
    return res.send('Error');
    else{
      var userTerm = {email: req.body.user_id};
      const updateUserReviews = {
        restName: req.body.rest_name, // name
        restID: parseInt(req.params.id), // password
        review: req.body.review,
        date: req.body.date
      };
      dbo.collection(USER_COLLECTION).updateOne(userTerm, {$addToSet: {Reviews: updateUserReviews}}, function(err, result) {
        if (err){
          //also update the reviews in the user collection for their profile
          return res.send('Error');
        }
        else {
          //return success only if everything is updated
          return res.send('Success');
        }
      });
    }
  });
});
////////SET REVIEW FOR ONE RESTAURANT ENDDDDD

////////SET RESERVATION FOR ONE RESTAURANT
app.post('/restaurant/reserve/:id',function (req, res){
  var dbo = db.db(DATABASE_NAME);
  var searchTerm = { id: parseInt(req.params.id) };
  const updateReserve = {
    user_id: req.body.user_id, // name
    user_name:req.body.user_name, // password
    date: req.body.date
  };
  //update the reviews in the restaurant collection
  dbo.collection(RESTAURANT_COLLECTION).updateOne(searchTerm, {$addToSet: {Reserve: updateReserve}}, function(err, result) {
    if (err)
    return res.send('Error');
    else{
      var userTerm = {email: req.body.user_id};
      const updateUserReserve = {
        restName: req.body.rest_name, // name
        restID: parseInt(req.params.id), // password
        date: req.body.date
      };
      dbo.collection(USER_COLLECTION).updateOne(userTerm, {$addToSet: {Reserve: updateUserReserve}}, function(err, result) {
        if (err){
          //also update the reviews in the user collection for their profile
          return res.send('Error');
        }
        else {
          //return success only if everything is updated
          return res.send('Success');
        }
      });
    }
  });
});
////////SET RESERVATION FOR ONE RESTAURANT ENDDDDD

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
