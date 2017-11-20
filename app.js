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

    // Helper to send a response and ensure a consistent response format
    var sendResponse = function (response, status, message, content) {
        if (!content) {
            content = {};
        }
        response.status(status).json({
            "status": status,
            "message": message,
            "content": content
        });
    }

    // Start server listening
    app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'));
    });

    // Products GET
    app.get('/products', function(request, response) {
      //console.log("1");
            // get the products collection
            var collection = db.collection('products');
            var filters = {};
            //request.query.minPrice=20;
            if (!isNaN(request.query.minPrice)) {
              filters.price = filters.price || {};
                filters.price.$gte = request.query.minPrice;
            } else if (request.query.minPrice != undefined) {
                sendResponse(response, 400, "Invalid minPrice.");
                return;
            }

            //request.query.maxPrice=50;
            if (!isNaN(request.query.maxPrice)) {
              filters.price = filters.price || {};
                filters.price.$lte = request.query.maxPrice;
            } else if (request.query.maxPrice != undefined) {
                sendResponse(response, 400, "Invalid maxPrice.");
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
                          console.log(result[i].name+result[i].price);
                    }
                    response.json(products);
                  }
                });
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
