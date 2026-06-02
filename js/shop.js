let beerGrid = document.getElementById("beerGrid");
let whiskyGrid = document.getElementById("whiskyGrid");
let wineGrid = document.getElementById("wineGrid");

let productsperpage = 6;
let currentBeerPage = 1;
let currentWhiskyPage = 1;
let currentWinePage = 1;

let beerProducts = products.filter((p) => p.category === "BEER");
let whiskyProducts = products.filter((p) => p.category === "WHISKY");
let wineProducts = products.filter((p) => p.category === "WINE");

function renderGrid(grid, list, page) {
  grid.innerHTML = "";
  let start = (page - 1) * productsperpage;
  let end = start + productsperpage;

  list.slice(start, end).forEach(function (product) {
    let discount = product.discount || 0;
    let discountedPrice = product.price - (product.price * discount) / 100;

    grid.innerHTML += `
  <div class="product-card">
    <img src="${product.image}">
    <h3>${product.name}</h3>
    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
    ${discount > 0 ? `<p class="original-price">Rs ${product.price}</p>` : ""}
    <p class="discounted-price">Rs ${discountedPrice}</p>
    <button class="cartBtn" data-id="${product.id}">Add To Cart</button>
  </div>
`;
  });
}
document.getElementById("beer-right").addEventListener("click", function () {
  let totalPages = Math.ceil(beerProducts.length / productsperpage);
  if (currentBeerPage < totalPages) {
    currentBeerPage++;
    renderGrid(beerGrid, beerProducts, currentBeerPage);
  }
});
document.getElementById("beer-left").addEventListener("click", function () {
  if (currentBeerPage > 1) {
    currentBeerPage--;
    renderGrid(beerGrid, beerProducts, currentBeerPage);
  }
});
document.getElementById("whisky-right").addEventListener("click", function () {
  let totalPages = Math.ceil(whiskyProducts.length / productsperpage);
  if (currentWhiskyPage < totalPages) {
    currentWhiskyPage++;
    renderGrid(whiskyGrid, whiskyProducts, currentWhiskyPage);
  }
});
document.getElementById("whisky-left").addEventListener("click", function () {
  if (currentWhiskyPage > 1) {
    currentWhiskyPage--;
    renderGrid(whiskyGrid, whiskyProducts, currentWhiskyPage);
  }
});

document.getElementById("wine-right").addEventListener("click", function () {
  let totalPages = Math.ceil(wineProducts.length / productsperpage);

  if (currentWinePage < totalPages) {
    currentWinePage++;
    renderGrid(wineGrid, wineProducts, currentWinePage);
  }
});
document.getElementById("wine-left").addEventListener("click", function () {
  if (currentWinePage > 1) {
    currentWinePage--;
    renderGrid(wineGrid, wineProducts, currentWinePage);
  }
});

renderGrid(beerGrid, beerProducts, currentBeerPage);
renderGrid(whiskyGrid, whiskyProducts, currentWhiskyPage);
renderGrid(wineGrid, wineProducts, currentWinePage);

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("cartBtn")) return; //cartbtn class click gareko haina vaney stop the function immediately or simply ignore

  let productId = e.target.dataset.id;
  let selectedProduct = products.find((p) => p.id == productId);
  let cartKey = "cart_" + user.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  let existing = cart.find((item) => item.id == productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1,
    });
  }
  localStorage.setItem(cartKey, JSON.stringify(cart));
  let message = document.getElementById("cartMessage");
  message.textContent = `${selectedProduct.name} added to cart!`;
  message.style.display = "block";

  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
});
