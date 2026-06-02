let flashProducts = products.filter(function (p) {
  return p.flash === true;
});

let flashcurrentpage = 1;
let flashproductsperpage = 5;
let left = document.getElementById("btn-left2");
let right = document.getElementById("btn-right2");
let showdiscountproduct = document.getElementById("flashGrid");

function showflashproducts() {
  showdiscountproduct.innerHTML = "";
  let start = (flashcurrentpage - 1) * flashproductsperpage;
  let end = flashcurrentpage * flashproductsperpage;
  let pageproducts = flashProducts.slice(start, end);
  showdiscountproduct.innerHTML = pageproducts
    .map(function (product) {
      let discountedPrice =
        product.price - (product.price * product.discount) / 100;
      return `
        <div class="product-card1">
            <span class="discount-badge">-${product.discount}%</span>
            <span class="category-badge">${product.category}</span>
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="original-price">Rs ${product.price}</p>
            <p class="discounted-price">Rs ${discountedPrice}</p>
            <button class="cartBtn" data-id="${product.id}">Add To Cart</button>
        </div>
    `;
    })
    .join("");
}
right.addEventListener("click", function () {
  if (flashcurrentpage * flashproductsperpage < flashProducts.length) {
    flashcurrentpage++;
    showflashproducts();
  }
});

left.addEventListener("click", function () {
  if (flashcurrentpage > 1) {
    flashcurrentpage--;
    showflashproducts();
  }
});
showflashproducts();
