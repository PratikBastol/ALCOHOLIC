document.addEventListener("click", function (e) {
  let btn = e.target.closest(".cartBtn");
  if (!btn) return;

  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please login first to add items to cart");
    window.location.href = "Account.html";
    return;
  }
  let productId = btn.dataset.id;
  let selectedProduct = products.find(function (p) {
    return p.id == productId;
  });
  let cartKey = "cart_" + user.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  let existing = cart.find((item) => item.id == productId);
  if (existing) {
    alert("Item already in cart. You can increase quantity from cart.");
  } else {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price:
        selectedProduct.price -
        (selectedProduct.discount / 100) * selectedProduct.price,
      image: selectedProduct.image,
      discount: selectedProduct.discount,
      category: selectedProduct.category,

      quantity: 1,
    });
    let message = document.getElementById("cartMessage");
    message.textContent = `${selectedProduct.name} added to cart!`;
    message.style.display = "block";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  window.updateCartCount();
});
