// SIDEBAR
const click = document.getElementById("openSidebar");
const toshow = document.getElementById("btn-nav");
const closeBtn = document.getElementById("closeSidebar");

click.addEventListener("click", () => {
  toshow.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  toshow.classList.remove("active");
});

// Search button
const searchGlass = document.getElementById("searchbtnglass");
const searchBar = document.getElementById("searchingbar");

searchGlass.addEventListener("click", () => {
  searchBar.classList.toggle("show");
});

// Navbar user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let navbarUser = document.getElementById("navbarUser");
let logoutBtn = document.getElementById("logoutBtn");

if (loggedInUser) {
  navbarUser.innerText = loggedInUser.firstname;
  logoutBtn.style.display = "inline-block";
} else {
  navbarUser.innerText = "Login";
  logoutBtn.style.display = "none";
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully");
  navbarUser.innerText = "Login";
  logoutBtn.style.display = "none";
  window.location.href = "Home.html";
});

navbarUser.addEventListener("click", function () {
  if (!loggedInUser) {
    window.location.href = "Account.html";
  } else {
    window.location.href = "profile.html";
  }
});

//to hide the account after login
let accountlink = document.querySelectorAll('a[href="Account.html"]');
accountlink.forEach(function (link) {
  if (loggedInUser) {
    link.parentElement.style.display = "none";
  } else {
    link.parentElement.style.display = "";
  }
});

// Search input
let searchinput = document.getElementById("searchInput");
let dropdown = document.getElementById("searchDropdown");
let categorySelect = document.getElementById("categorySelect");

if (searchinput) {
  let handleSearch = function () {
    let searchingtext = searchinput.value.toLowerCase().trim();
    let selectedCategory = categorySelect.value;

    if (searchingtext === "" && selectedCategory === "all") {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
      return;
    }

    let filtred = products.filter(function (product) {
      let matchesText = product.name.toLowerCase().includes(searchingtext);
      let matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory;
      return matchesText && matchesCategory;
    });

    dropdown.style.display = "block";
    dropdown.style.backgroundColor = "black";

    dropdown.innerHTML = filtred
      .map(function (product) {
        let discount = product.discount || 0;
        let link = "Shop.html#section" + product.category;
        return `<a href="${link}"><div class="dropdown-item">
                <img src="${product.image}">
                <span class="dropdown-name">${product.name}</span>
                <span class="dropdown-category">${product.category}</span>
                ${discount > 0 ? `<span class="dropdown-discount">-${discount}%OFF</span>` : ""}
            </div></a>`;
      })
      .join("");
  };

  searchinput.addEventListener("input", handleSearch);

  categorySelect.addEventListener("change", handleSearch);

  document.addEventListener("click", function (e) {
    if (!e.target.closest("#searchingbar")) {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
    }
  });
}
window.updateCartCount = function () {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;
  let cartKey = "cart_" + user.email;
  let cartcount = document.getElementById("cartcount");
  const cart = JSON.parse(localStorage.getItem(cartKey) || []);
  cartcount.textContent = cart.length;
};
window.updateCartCount();

let lastScrollTop = 0;
let divbelowsearch = document.getElementById("divbelowsearch");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    divbelowsearch.style.transform = "translateY(-100%)";
  } else {
    divbelowsearch.style.transform = "translateY(0)";
  }

  lastScrollTop = currentScroll;
});
