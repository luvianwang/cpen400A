db.createCollection("users", {});
db.createCollection("products", {});
db.createCollection("orders", {});


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

for(var key in productsObject){
  db.products.insert(productsObject[key]);
}
