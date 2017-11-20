var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var bodyParser = require('body-parser')

// Connection URL
var url = 'mongodb://localhost:27017/cpen400A_Wang_Kamath';

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

var initApp = function (db) {

    // Start server listening
    app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'));
    });

    // Products GET
    app.get('/products', function(request, response) {

	     response.header("Access-Control-Allow-Origin", "*");
	      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      //console.log("1");
            // get the products collection
            var collection = db.collection('products');
            var filters = {};

            //can filter out any product with price>= to minPrice
            //eg:request.query.minPrice=20;
            if (!isNaN(request.query.minPrice)) {
              filters.price = filters.price || {};
                filters.price.$gte = request.query.minPrice;
            } else if (request.query.minPrice != undefined) {
                response.status(status).json({
                    "status": response,
                    "message": 400,
                    "content": "Invalid minPrice."
                });
                return;
            }

            //can filter out any product with price<= to maxPrice
            //eg:request.query.maxPrice=50;
            if (!isNaN(request.query.maxPrice)) {
              filters.price = filters.price || {};
                filters.price.$lte = request.query.maxPrice;
            } else if (request.query.maxPrice != undefined) {
                response.status(status).json({
                    "status": response,
                    "message": 400,
                    "content": "Invalid maxPrice."
                });
                return;
            }

            collection.find(filters).toArray(function(error, result) {
              if (error) {
               console.log("Error: could not retrieve products.")
               response.status(500).send("An error occurred, please try again");
              } else {
                    var products = {};
                    for (var i = 0; i < result.length; i++) {
                        var name = result[i].name;
                        products[name] = {
                            "price": result[i].price,
                            "quantity": result[i].quantity,
                            "url": result[i].url
                        }
                          console.log("1"+result[i].name+"  "+result[i].quantity);
                    }
                    response.json(products);
                  }
                });
    });

    app.post('/checkout', function(request, response) {

	     response.header("Access-Control-Allow-Origin", "*");
	     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      var orders = db.collection('orders');
      var products = db.collection('products');

      var cart = request.body.cart;
      var total = request.body.total;

      //console.log("cart:"+cart);
      if (cart && total){
        var doc = {
            cart: cart,
            total: total
        };

      orders.insert(doc, {}, function (error, result) {
          if (error) errorHandler();
      });

      //for (item in cart) {
          //console.log("333 "+cart[0].name+": "+cart[0].quantity);

      products.find({}).toArray(function(error, result) {
        if (error) {
         console.log("Error: could not retrieve products.")
         response.status(500).send("An error occurred, please try again");
        } else {
              for (var elem in result) {
                  console.log("111 "+elem+result[elem].name+": "+result[elem].quantity);
                  for(var item in cart){
           		       //console.log("hey" + item+" "+cart[item]);
                     if(result[elem].name==item){
                       //result[elem].quantity -= cart[item];

                       //update database after checkout
                        products.updateOne({name: item}, {$inc: {quantity: -1 * cart[item]}}, function (error, result) {
                            if (error) throw new Error("Error updating products collection.");
                        });

                		    //console.log("final" + item+" "+ result[elem].quantity);
                        break;
                     }
           	      }
              }
            }
          });


      response.status(200).send("Checkout successful.");
    }
    });
};


//connect to the server
MongoClient.connect(url, function(err, db) {
  if (err) {
        console.log('Error: Unable to connect to Mongo server.');
        console.log(err);
        process.exit(1);
    } else {
        console.log('Successfully connected to Mongo server.');
        initApp(db);
    }
});
