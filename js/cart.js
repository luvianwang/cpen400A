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

//Global variables
var inactiveTime = setTimeout(alertUser, 30000);
var cart = [];
var products = [];
init();

/**
 * Initializes the global variable products.
 *@modifies: 'product' variable with all products with quantity '5' by default
 */
function init(){
  for(var i = 0; i < productsArray.length; i++){
    products[productsArray[i]] = 5;
  }
};

/**
* Alert user to be used by timeout function to alert user.
*/
function alertUser(){
  alert("Hey there! Are you still planning to buy something?");
  resetTimer();
};

/**
*Clears and resets the global variable 'inactiveTime'. This function
*is called whenever a click action is performed.
*@modifies: 'inactiveTime' global variable.
*/
function resetTimer(){
  clearTimeout(inactiveTime);
  inactiveTime = setTimeout(alertUser, 30000);
};

/**
*Adds a product item to global variable 'cart'.
*@modifies: Adds a product item to 'cart' if not present or increments quantity by 1 if already
*present.
*/
function addItem(name){
    if(products[name] > 0){
      products[name] = products[name] - 1;
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
};

/**
*Removes an item from global variable 'cart'.
*@modifies: removes a product item from 'cart' if quanity is 1
*otherwise decrements quantity by 1
*/
function removeItem(name){
  if(products[name] < 5){
    products[name] = products[name] + 1;
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
  resetTimer();
};

/**
*Remove from cart removes product item from cart and resets timer.
*/
function removeFromCart(productName){
  removeItem(productName);
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
};
