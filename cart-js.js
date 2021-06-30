let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'Love in the City',
    tag: 'love-in-the-city',
    price: 1503,
    inCart:0
  },
  {
    name: 'I\'m Behind You',
    tag: 'behind-you',
    price: 1074,
    inCart:0
  },
  {
    name: 'The Girl on the Train',
    tag: 'girl-on-the-train',
    price: 449,
    inCart:0
  },
  {
    name: 'Ikigai',
    tag: 'ikigai',
    price: 339,
    inCart:0
  },
  {
    name: 'One Last Stop',
    tag: 'one-last-stop',
    price: 1299,
    inCart:0
  },
  {
    name: 'Aftershocks: A Memoir',
    tag: 'aftershocks',
    price: 1274,
    inCart:0
  },
  {
    name: 'The Last Thing He Told Me',
    tag: 'last-thing',
    price: 695,
    inCart:0
  },
  {
    name: 'A Slow Fire Burning',
    tag: 'fire-burning',
    price: 1940,
    inCart:0
  },
  {
    name: 'The Alchemist',
    tag: 'alchemist',
    price: 180,
    inCart:0
  },
  {
    name: 'Becoming Michelle Obama',
    tag: 'becoming',
    price: 509,
    inCart:0
  },
  {
    name: 'The Girl in Room 105',
    tag: 'girl-in-room-105',
    price: 110,
    inCart:0
  },
  {
    name: 'Wish I Could Tell You',
    tag: 'wish-i-could-tell-you',
    price: 133,
    inCart:0
  }
];
for(let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


function cartNumbers(product){
  console.log("the product clicked is", product);
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if(productNumbers){
  localStorage.setItem('cartNumbers',productNumbers + 1);
  document.querySelector('.cart span').textContent = productNumbers + 1;
  }
  else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if(cartItems != null){
    if(cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }
  else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }
  else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart(){
  let cartItems =localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  if(cartItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
      <i class="fa fa-times-circle"></i>
      <img src="./images/${item.tag}.jpg" style="width: 100px"; class="product-title">
      
      <div class="price-product">${item.price}</div>
      <div class="quantity">
      <i class="fa fa-minus-circle" aria-hidden="true"></i>
      <span class="quantity-span">${item.inCart}</span>
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
      <span class="total">
      &#x20B9;${item.inCart * item.price}.00
      </span>
      </div>
     
      `;
    });
    
    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle>
          Basket Total
        </h4>
        <h4 class="basketTotal">
        &#x20B9; ${cartCost} .00
        </h4> 
    `;


  }
}


onLoadCartNumbers();
displayCart();

/*<div class="price">${item.price}</div>
      <div class="quantity">
      <i class="fa fa-minus-circle" aria-hidden="true"></i>
      <span>${item.inCart}</span>
      <i class="fa fa-plus-circle" aria-hidden="true"></i>

      </div>*/
{/* 
  <span style="color: white; font-size: 16px;">${item.name}</span>
  
  <span class="price">${item.price}</span>
      <span class="quantity">
      <i class="fa fa-minus-circle" aria-hidden="true"></i>
      <span>${item.inCart}</span>
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </span>
      <span class="total">
      &#x20B9;${item.inCart * item.price}.00
      </span> */}
