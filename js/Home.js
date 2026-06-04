let announcementBar = document.createElement("div");
announcementBar.classList.add("announcement-bar");
announcementBar.innerHTML = `
<p> ! There is discount on different alcohol items ! </p>
`;
announcementBar.style.background = "rgba(215, 62, 62, 0.658)";
announcementBar.style.color = "white";
announcementBar.style.display = "flex";

//to show product in home page

let currentpage = 1;
let productsperpage = 5;
let leftbtn = document.getElementById("btn-left");
let rightbtn = document.getElementById("btn-right");
let showproducts = document.getElementById("productsGrid");
function renderproducts() {
  showproducts.innerHTML = "";
  let start = (currentpage - 1) * productsperpage;
  let end = currentpage * productsperpage;
  let pageproducts = products.slice(start, end);

  pageproducts.forEach(function (product) {
    let discount = product.discount || 0;
    let discountedprice = product.price - (product.price * discount) / 100;
    showproducts.innerHTML += `<div class="product-card">
    <span class="spancategory">${product.category}</span>
    <img src="${product.image}">
    <h2>${product.name}</h2>
${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
   ${discount > 0 ? `<p class="original-price">Rs ${product.price}</p>` : ""}
<p class="discounted-price">Rs ${discountedprice}</p>
    <button class="cartBtn" data-id="${product.id}">
        Add To Cart
    </button>
    
    `;
  });
}
leftbtn.addEventListener("click", function () {
  if (currentpage > 1) {
    currentpage--;
    renderproducts();
  }
});

rightbtn.addEventListener("click", function () {
  if (currentpage * productsperpage < products.length) {
    currentpage++;
    renderproducts();
  }
});
renderproducts();
let filter = document.getElementById("filter");
let dropdowntoshow = document.getElementById("filterdropdown");
filter.addEventListener("click", function () {
  dropdowntoshow.style.display = "block";
});
document.addEventListener("click", function (e) {
  if (!filter.contains(e.target)) {
    dropdowntoshow.style.display = "none";
  }
});
let lowrange = document.getElementById("low");
let highrange = document.getElementById("high");
let atoz = document.getElementById("az");
let ztoa = document.getElementById("za");

lowrange.addEventListener("click", () => {
  currentpage = 1;
  products.sort(function (a, b) {
    return a.price - b.price;
  });
  filter.innerText = "Low to high";
  renderproducts();
});
highrange.addEventListener("click", function () {
  currentpage = 1;

  products.sort(function (a, b) {
    return b.price - a.price;
  });
  filter.innerText = "High to low";

  renderproducts();
});
atoz.addEventListener("click", function () {
  currentpage = 1;
  products.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  filter.innerText = "A to Z";
  renderproducts();
});
ztoa.addEventListener("click", function () {
  currentpage = 1;
  products.sort(function (a, b) {
    return b.name.localeCompare(a.name);
  });
  filter.innerText = "Z to A";
  renderproducts();
});
