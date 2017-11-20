var MongoClient = require('mongodb').MongoClient;
var keywordsDb;
var keywordsColl;

var productsObject =
{"KeyboardCombo":{"name":"KeyboardCombo","price":34,"quantity":8,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/KeyboardCombo.png"},
"Mice":{"name":"Mice","price":6,"quantity":5,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Mice.png"},
"PC1":{"name":"PC1","price":326,"quantity":1,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/PC1.png"},
"PC2":{"name":"PC2","price":398,"quantity":9,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/PC2.png"},
"PC3":{"name":"PC3","price":371,"quantity":2,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/PC3.png"},
"Tent":{"name":"Tent","price":31,"quantity":2,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Tent.png"},
"Box1":{"name":"Box1","price":7,"quantity":7,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Box1.png"},
"Box2":{"name":"Box2","price":6,"quantity":7,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Box2.png"},
"Clothes1":{"name":"Clothes1","price":24,"quantity":5,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Clothes1.png"},
"Clothes2":{"name":"Clothes2","price":28,"quantity":9,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Clothes2.png"},
"Jeans":{"name":"Jeans","price":31,"quantity":10,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Jeans.png"},
"Keyboard":{"name":"Keyboard","price":23,"quantity":6,"imageUrl":"https://cpen400a-bookstore.herokuapp.com/images/Keyboard.png"}};

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
   if(err) throw err;

   db.createCollection("products", function(err, res) {
      if (err) throw err;
      console.log("Products collection created!");
      db.close();
    });

    db.createCollection("users", function(err, res) {
       if (err) throw err;
       console.log("Users collection created!");
       db.close();
     });

     db.createCollection("orders", function(err, res) {
        if (err) throw err;
        console.log("Orders collection created!");
        db.close();
      });


      db.collection("products").count({}, function(error, numOfDocs) {
          if(numOfDocs === 0){
              for(var key in productsObject){
                db.collection("products").insertOne(productsObject[key], function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              }
          }
      });

});


var express = require('express')
var app = express()

var appHost = 'https://cpen400a-bookstore.herokuapp.com/';

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/checkout?', function(request, response){

  var cart = request.query.cart;
  var total = parseInt(request.query.total);

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  var order = {cart: cart, total: total};
  db.collection("orders").insertOne(order, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");

    var jsonResponse = {};

    jsonResponse.result  = "Success";
    response.send(jsonResponse);
    db.close();
  });
  });

})

app.get('/products?', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("Query Parameters");
  console.log(request.query.lte);
  console.log(request.query.gte);
  //if (option < 4) {

  var lte = parseInt(request.query.lte);
  var gte = parseInt(request.query.gte);

  if(!lte && !gte){
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  db.collection("products").find({}).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
    console.log(result);
    db.close();
  });
  });

}else if(lte && !gte){
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  db.collection("products").find({ price: {$lte: lte}}).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
    console.log(result);
    db.close();
  });
  });

}else if(gte && !lte){

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  db.collection("products").find({ price: {$gte: gte}}).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
    console.log(result);
    db.close();
  });
  });

}else if(gte && lte){

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  db.collection("products").find({ price: {$gte: gte, $lte: lte}}).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
    console.log(result);
    db.close();
  });
  });

}
  //} else if (option == 4) {
  //  response.status(500).send("An error occurred, please try again");
  //}
})

app.get('/products/:productKey', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var option = getRandomInt(0,5);

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  db.collection("products").find({name: request.params.productKey}).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
    console.log(result);
    db.close();
  });
  });

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
