var express = require('express');
var app = express();
app.use( require('body-parser')() );
var Db = require('mongodb').Db,
 MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
db = new Db('user', new Server('localhost', 27017));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/regis', function(req, res) {
    res.render('pages/regis');
});


app.get('/employ',function(req,res){

res.render('pages/employ',{make:mk});

});








app.post('/login',function(req,res){

      console.log("hello");


      console.log(req.body.loginame);
      var username=req.body.loginame;
      var password=req.body.loginpass;


 db.open(function(err, db) {

    db.collection('users', function(err, collection) {

    collection.findOne({username:username,password:password},function(err,docs){
        //do something

        console.log("helloooo");
     

       
       db.close();
      });


  
  });
});

 
 res.redirect('/employ'); 

});












// // about page 





app.post('/regis',function(req,res){

var username=req.body.uname;
var password=req.body.pass;
var email=req.body.em;
var phone=req.body.num;
var address=req.body.add;
console.log(req.body.uname);

var userObject = {username: username, password: password, email:email, phone:phone , address:address};

   
db.open(function(err, db) {

 db.createCollection('users', function(err, collection) {
      collection.insert(userObject,  function(err, result) {
      console.log(result);

       db.close(); 
    });
  });
});

 res.redirect('/login');  
});




// app.post('/employ',function(req,res){

       
 db.open(function(err, db) {

    db.collection('users', function(err, collection) {

    collection.find().toArray(function(err,docs){
      console.log(docs);
        //do something
     if(docs.length)
     {

      mk=docs;
     }

    
       
       db.close();
      });


  
  });
});


// });




















app.listen(8080);
console.log('8080 is the magic port');