//Product array with names of all product items.
var productsArray = [
  "Box1",
  "Box2",
  "Clothes1",
  "Clothes2",
  "Jeans",
  "Keyboard",
  "KeyboardCombo",
  "Mice",
  "PC1",
  "PC2",
  "PC3",
  "Tent"
];

var priceArray = [ 10, 5, 20, 30, 50, 20, 40, 20, 350, 400, 300, 100];

var urlArray = [
  "images/Box1_$10.png",
  "images/Box2_$5.png",
  "images/Clothes1_$20.png",
  "images/Clothes2_$30.png",
  "images/Jeans_$50.png",
  "images/Keyboard_$20.png",
  "images/KeyboardCombo_$40.png",
  "images/Mice_$20.png",
  "images/PC1_$350.png",
  "images/PC2_$400.png",
  "images/PC3_$300.png",
  "images/Tent_$100.png"
];

var Product = function(name, price, imageUrl){
  this.name = name;
  this.price = price;
  this.imageUrl = imageUrl;
};

Product.prototype.computeNetPrice = function(quantity){
  return this.price*quantity;
};

var box1 = new Product('Box1', 10, 'images/products/Box1_$10.png');
console.log( box1.name );
console.log( box1.computeNetPrice(5) );

//Global variables
var inactiveTime = setInterval(alertUser, 1000);
var counter = 0;
var cart = [];
var products = [];
//init();

/**
 * Initializes the global variable products.
 *@modifies: 'product' variable with all products with quantity '5' by default
 */
function init(){
  for(var i = 0; i < productsArray.length; i++){
    var obj = {};
    obj.product = new Product(productsArray[i], priceArray[i], urlArray[i]);
    obj.quantity = 5;
    products[productsArray[i]] = obj;
    console.log(obj);
  }

  var removeButtons = document.getElementsByClassName("removeButton");

  for(var i = 0; i < removeButtons.length; i++){
    removeButtons[i].removeClass("removeButton");
    removeButtons[i].addClass("hideRemoveButton");
  }

  document.getElementById("cartTotal").innerText = "Cart ($0)";
};

function updateCartTotal(){
  var total = 0;
  for(var key in cart){
    let quantity = cart[key];
    total = total + products[key].product.computeNetPrice(quantity);
  }

  document.getElementById("cartTotal").innerText = "Cart ($" + total + ")";
};

function updateAddButton(name){
  if(products[name].quantity === 0){
    document.getElementById("add_" + name).removeClass("addButton");
    document.getElementById("add_" + name).addClass("hideAddButton");
    document.getElementById("stock_" + name).removeClass("hideOutOfStock");
    document.getElementById("stock_" + name).addClass("outOfStock");
  }

  if(cart[name] && cart[name] > 0){
    document.getElementById("remove_" + name).removeClass("hideRemoveButton");
    document.getElementById("remove_" + name).addClass("removeButton");
  }
};

function updateRemoveButton(name){
  if(products[name].quantity > 0){
    document.getElementById("add_" + name).removeClass("hideAddButton");
    document.getElementById("add_" + name).addClass("addButton");
    document.getElementById("stock_" + name).removeClass("outOfStock");
    document.getElementById("stock_" + name).addClass("hideOutOfStock");
  }

  if(!cart[name] ||  cart[name] == 0){
    document.getElementById("remove_" + name).removeClass("removeButton");
    document.getElementById("remove_" + name).addClass("hideRemoveButton");
  }

};

/**
* Alert user to be used by timeout function to alert user.
*/
function alertUser(){
  counter = counter + 1;
  document.getElementById("inactiveTimeDisplay").innerText = "Inactive Time: " + counter;
  if(counter === 300){
    alert("Hey there! Are you still planning to buy something?");
    resetTimer();
  }
};

/**
*Clears and resets the global variable 'inactiveTime'. This function
*is called whenever a click action is performed.
*@modifies: 'inactiveTime' global variable.
*/
function resetTimer(){
  counter = 0;
  clearTimeout(inactiveTime);
  inactiveTime = setInterval(alertUser, 1000);
};

/**
*Adds a product item to global variable 'cart'.
*@modifies: Adds a product item to 'cart' if not present or increments quantity by 1 if already
*present.
*/
function addItem(name){
    if(products[name].quantity > 0){
      products[name].quantity = products[name].quantity - 1;
    }else{
      alert("This product is out of stock.");
      return;
    }
    var numProduct = cart[name];
    if(numProduct == null){
      cart[name] = 1;
    }else{
      cart[name] = cart[name] + 1;
    }

    updateAddButton(name);
    removeAddButton(name);

};

/**
*Removes an item from global variable 'cart'.
*@modifies: removes a product item from 'cart' if quanity is 1
*otherwise decrements quantity by 1
*/
function removeItem(name){
  if(products[name].quantity < 5){
    products[name].quantity = products[name].quantity + 1;
  }
  var numProduct = cart[name];
  if(numProduct == null){
    alert("Product does not exist in the cart.");
  }else if(numProduct == 1){
    delete cart[name];
  }else{
    cart[name] = cart[name] - 1;
  }
};

/**
*Constructs string of product items present in cart.
*@returns: string with concatenated product item names and respective quantities.
*/
function printCart(){
  var cartItems = "";
  for (var key in cart) {
    let value = cart[key];
    cartItems = cartItems + key + " " + ":" + "  " + value + "\n";
  }
  //console.log(cartItems);
  return cartItems;
};

/**
* Add to cart functions adds product item to cart and resets timer.
*/
function addToCart(productName){
  addItem(productName);
  updateCartTotal();
  resetTimer();
};

/**
*Remove from cart removes product item from cart and resets timer.
*/
function removeFromCart(productName){
  removeItem(productName);
  updateCartTotal();
  resetTimer();
};

/**
*Show cart alerts the user about current cart status with the product items
*in the cart presently.
*/
function showCart(){
  var cartItems = printCart();
  if(cartItems === ""){
    alert("No items in cart");
  }else{
    //console.log("In show cart + cartitems:" + cartItems);
    alert(cartItems);
  }
  resetTimer();
};
