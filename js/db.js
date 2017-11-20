var MongoClient = require('mongodb').MongoClient;
var keywordsDb;
var keywordsColl;

MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
   console.log("Successfull");
   console.log(database);
});
