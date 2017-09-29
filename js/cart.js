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

var inactiveTime = setTimeout(alertUser, 30000);
var cart = [];
var products = [];

//Initialization
for(var i = 0; i < productsArray.length; i++){
  products.push({name: productsArray[i], quantity: 5});
};

function alertUser(){
  alert("Hey there! Are you still planning to buy something?");
};

function resetTimer(){
  clearTimeout(inactiveTime);
  inactiveTime = setTimeout(alertUser, 30000);
};

function addItem(name){
    var index = -1;
    for(var i= 0; i < cart.length; i++){
      if(cart[i].name === name){
        index = i;
        break;
      }
    }
    if(index > -1){
      var quantity = cart[index].quantity;
      cart[index].quantity = quantity + 1;
    }else{
      cart.push({name: name, quantity: 1});
    }
    return index;
};

function removeItem(name){
    var index = -1;
    for(var i= 0; i < cart.length; i++){
      if(cart[i].name === name){
        index = i;
        break;
      }
    }

    if(index > -1){
      var quantity = cart[index].quantity;
      if(quantity === 1){
        cart.splice(index, 1);
      } else if (quantity > 1){
        cart[index].quantity = quantity - 1;
      }
    }
    return index;
};

function getItems(){
    return cart;
};

function getProducts(){
    return products;
};

function getQuantity(name){
    var index = -1;
    for(var i= 0; i < cart.length; i++){
      if(cart[i].name === name){
        index = i;
        break;
      }
    }
    if(index > -1){
      var quantity = cart[index].quantity;
      return quantity;
    }
    return 0;
};

function setProductQuantity(productName, quantity){
  var index = -1;
  for(var i= 0; i < products.length; i++){
    if(products.name === productName){
      index = i;
      break;
    }
  }

  if(index > -1){
    products[index].quantity = quantity;
  }
};

function printCart(){
  var cartItems = "";
  if(cart.length > 0){
    for(var i = 0; i < cart.length; i++){
      cartItems = cartItems + cart[i].name + " " + ":" + "  " + cart[i].quantity + "\n";
    }
  }
  //console.log(cartItems);
  return cartItems;
};

function addToCart(productName){
  addItem(productName);
  var quantity = getQuantity(productName);
  setProductQuantity(productName, quantity);
  //console.log(getItems());
  //console.log(getProducts());
  resetTimer();
};

function removeFromCart(productName){
  var index = removeItem(productName);
  if(index < 0){
    alert("Product does not exist in the cart.");

  }
  var quantity = getQuantity(productName);
  setProductQuantity(productName, quantity);
  //console.log(getItems());
  //console.log(getProducts());
  resetTimer();
};

function showCart(){
  var cartItems = printCart();
  if(cartItems === ""){
    alert("No items in cart");
  }else{
    //console.log("In show cart + cartitems:" + cartItems);
    alert(cartItems);
  }
};
