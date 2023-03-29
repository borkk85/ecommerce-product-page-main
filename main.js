const priceElement = document.querySelector(".price");
const counterElement = document.querySelector(".counter");
const originalPriceElement = document.querySelector(".original-price");
const discountElement = document.querySelector(".discount");
const minusElement = document.querySelector(
  ".counter-wrapper span:first-child"
);
const plusElement = document.querySelector(".counter-wrapper span:last-child");
const originalPrice = 250;
const discount = 0.5;

function renderCurrentPrice() {
  const discountPrice = originalPrice * discount;

  originalPriceElement.textContent = `$${originalPrice}`;
  discountElement.textContent = `${discount * 100}%`;
  priceElement.textContent = `$${discountPrice}`;
}

renderCurrentPrice();

let count = 0;

function handleMinus() {
  if (count > 0) {
    count--;
    counterElement.textContent = count;
  }
}

function handlePlus() {
  count++;
  counterElement.textContent = count;
}

minusElement.addEventListener("click", handleMinus);
plusElement.addEventListener("click", handlePlus);

const checkOut = document.querySelector(".cart-checkout");

function addToCartFunc(e) {
  let button = e.target;
  let shopItem = button.closest(".hero-section");
  let title = shopItem.querySelector(".item-name").textContent;
  let price = parseInt(
    shopItem.querySelector(".price").textContent.replace("$", "")
  );
  let quantity = shopItem.querySelector(".counter").textContent;
  let imageSrc = shopItem.querySelector(".preview-images img").src;
  let total = price * quantity;

  if (quantity === "0") {
    return;
  }

  addItem(title, price, quantity, imageSrc, total);
  shopItem.querySelector(".counter").textContent = "0";
  updateCart();
  updateOrderedItems() 
}

const addToCart = document.querySelector(".btn");
addToCart.addEventListener("click", addToCartFunc);

function addItem(title, price, quantity, imageSrc, total) {
  const cartSelection = document.querySelector(".cart-wrapper");

  let html = ` 
  <div class='cart-selection'>    
    <div class="cart-item-info">
    <img class="cart-item-image" src="${imageSrc}" alt="" />
      <span class="cart-item-name">${title}</span>
      <div class="cart-item-pricing">
        <span class="cart-item-calc">$${price} x <input type="number" class="cart-item-quantity" value="${quantity}" min="1"></span>
        <span class="total-cost">$${total}</span>
      </div>
      <svg class="btn-danger" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
    </div>
    <button class='checkout-button'>Checkout</button>
    </div>`;

  cartSelection.innerHTML = html;

  cartSelection
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);    
}


function updateCart() {
    const cartSelection = document.querySelector(".cart-wrapper");
    const cartItems = document.querySelectorAll(".cart-selection");
    const orderedItems = document.querySelector(".ordered-items");
    orderedItems.textContent = cartItems.length;
  
    if (cartItems.length === 0) {
      orderedItems.classList.add("hidden");
    } else {
      orderedItems.classList.remove("hidden");
    }
  
    if (cartSelection.children.length === 0) {
      const emptyCart = document.createElement("div");
      emptyCart.classList.add("empty-cart");
      emptyCart.textContent = `Your cart is empty`;
      cartSelection.appendChild(emptyCart);
    }
  }

function displayEmptyCartMessage() {
  const cartSelection = document.querySelector(".cart-wrapper");

  if (cartSelection.children.length === 0) {
    const emptyCart = document.createElement("div");
    emptyCart.classList.add("empty-cart");
    emptyCart.textContent = `Your cart is empty`;
    cartSelection.appendChild(emptyCart);
  }
}

displayEmptyCartMessage();


const cart = document.querySelector(".cart");

cart.addEventListener("click", () => {
  checkOut.classList.toggle("visible");
});

function removeCartItem(e) {
  const buttonClicked = e.target;
  buttonClicked.closest(".cart-selection").remove();

  updateCart();
  updateOrderedItems();
}

function updateOrderedItems() {
    const cartSelections = document.querySelectorAll(".cart-selection");
    let totalQuantity = 0;
  
    for (const cartSelection of cartSelections) {
      const input = cartSelection.querySelector(".cart-item-quantity");
      totalQuantity += parseInt(input.value);
    }
  
    const orderedItemsElement = document.querySelector(".ordered-items");
    orderedItemsElement.textContent = totalQuantity;
  
    if (totalQuantity > 0) {
      orderedItemsElement.classList.add("visible");
    } else {
      orderedItemsElement.classList.remove("visible");
    }
  }

function quantityChange(e) {
  let quantity = e.target;
  if (isNaN(quantity.value) || quantity.value < 0) {
    quantity.value = 0;
  }

  updateCart();
  updateOrderedItems();
}

counterElement.addEventListener("change", quantityChange);
counterElement.addEventListener("click", quantityChange);

// Nav hamburgerburger selections
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector('.navigation-menu');
const nav = document.querySelector(".browse-menu");

// Hamburger menu function
burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});