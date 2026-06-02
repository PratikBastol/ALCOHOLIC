document.addEventListener("DOMContentLoaded", function () {
  let cartContainer = document.getElementById("cart");
  let emptyCart = document.getElementById("emptyCart");
  let totalText = document.getElementById("subtotal");
  let grandtotal = document.getElementById("grandtotal");
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "Account.html";
    return;
  }
  let cartKey = "cart_" + user.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart = cart.map(function (item) {
    if (!item.quantity) item.quantity = 1;
    return item;
  });
  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  window.renderCartCount = function () {};
  function renderCart() {
    // Update item count badge
    let cartCountBadge = document.getElementById("cartCountBadge");
    let cartcount = document.getElementById("cartcount");

    if (cartCountBadge) {
      cartCountBadge.textContent = cart.length + " items";
      cartcount.textContent = cart.length;
    }

    if (cart.length === 0) {
      emptyCart.style.display = "flex";
      cartContainer.style.display = "none";
      totalText.innerText = "Rs 0";
      grandtotal.innerText = "Rs 0";
      return;
    }
    emptyCart.style.display = "none";
    cartContainer.style.display = "block";
    let totalPrice = 0;
    cartContainer.innerHTML = cart
      .map(function (item) {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        return `
                <div class="cart-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">                   
                        <h3>${item.name}</h3>
                        <p>Price: Rs ${item.price}</p>
                        <p>Total: Rs ${itemTotal}</p>
                        <div class="qty-btns">
                            <button class="decrease" data-id="${item.id}">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <i class="trash remove fa-solid fa-trash-can" 
                       data-id="${item.id}">
                    </i>
                </div>
            `;
      })
      .join("");

    let shipping = 0;
    let discount = 0;

    totalText.innerText = "Rs " + totalPrice;
    grandtotal.innerText = "Rs " + (totalPrice + shipping - discount);
  }

  window.renderCart = renderCart;

  //button haru ko lagi

  cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("increase")) {
      let id = e.target.dataset.id;
      let item = cart.find((p) => p.id == id);
      if (item) {
        item.quantity++;
        saveCart();
        renderCart();
      }
    }

    // decrease
    else if (e.target.classList.contains("decrease")) {
      let id = e.target.dataset.id;
      let item = cart.find((p) => p.id == id);
      if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
      }
    }
    //remove
    else if (e.target.classList.contains("remove")) {
      let id = e.target.dataset.id;
      cart = cart.filter((item) => item.id != id);
      saveCart();
      renderCart();
    }
  });

  renderCart();
});
