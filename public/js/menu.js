/*
=========================================================
 FoodExpress Pro
 Menu Page
=========================================================
*/

const FOOD_API = "/api/food";
const CATEGORY_API = "/api/category";

const foodContainer = document.getElementById("foodContainer");
const categoryContainer = document.getElementById("categoryContainer");
const searchFood = document.getElementById("searchFood");

let allFoods = [];
let selectedCategory = "";

/* =====================================
   Category Icons
===================================== */

function getCategoryIcon(name) {

    const icons = {

        Pizza: "🍕",
        Burger: "🍔",
        Drinks: "🥤",
        Dessert: "🍰",
        Snacks: "🍟",
        Biryani: "🍗",
        Chinese: "🍜",
        Momos: "🥟",
        Rolls: "🌯"

    };

    return icons[name] || "🍽";

}

/* =====================================
   Load Categories
===================================== */

async function loadCategories() {

    try {

        const response = await fetch(CATEGORY_API);

        const data = await response.json();

        if (!data.success) return;

        categoryContainer.innerHTML = "";

        const allBtn = document.createElement("button");

        allBtn.className = "category-btn active";

        allBtn.innerHTML = "🍽 All";

        allBtn.onclick = () => {

            selectedCategory = "";

            updateActiveButton(allBtn);

            filterFoods();

        };

        categoryContainer.appendChild(allBtn);

        data.categories.forEach(category => {

            const btn = document.createElement("button");

            btn.className = "category-btn";

            btn.innerHTML = `${getCategoryIcon(category.name)} ${category.name}`;

            btn.onclick = () => {

                selectedCategory = category.name;

                updateActiveButton(btn);

                filterFoods();

            };

            categoryContainer.appendChild(btn);

        });

    }

    catch (error) {

        console.log(error);

    }

}

/* =====================================
   Active Category
===================================== */

function updateActiveButton(button) {

    document.querySelectorAll(".category-btn").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

}

/* =====================================
   Load Foods
===================================== */

async function loadFoods() {

    try {

        foodContainer.innerHTML = `

        <div class="col-12 text-center">

            <div class="loader"></div>

            <p class="mt-3">

                Loading Menu...

            </p>

        </div>

        `;

        const response = await fetch(FOOD_API);

        const data = await response.json();

        if (!data.success) {

            foodContainer.innerHTML = `

            <div class="alert alert-warning">

                No Food Found

            </div>

            `;

            return;

        }

        allFoods = data.foods;

        displayFoods(allFoods);

    }

    catch (error) {

        console.log(error);

    }

}

/* =====================================
   Display Foods
===================================== */

function displayFoods(foods) {

    foodContainer.innerHTML = "";

    if (foods.length === 0) {

        foodContainer.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                No Food Found

            </div>

        </div>

        `;

        return;

    }

    foods.forEach(food => {

        foodContainer.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6 mb-4">

<div class="food-card h-100">

<div class="food-image position-relative">

<img src="${food.image}" alt="${food.name}">

<div class="rating">

⭐ 4.8

</div>

<div class="offer">

20% OFF

</div>

</div>

<div class="food-info d-flex flex-column">

<h5>

${food.name}

</h5>

<span class="category-badge">

${food.category?.name || "Food"}

</span>

<p class="text-muted mt-2">

${food.description}

</p>

<div class="d-flex justify-content-between align-items-center mt-auto">

<div class="food-price">

₹${food.price}

</div>

<button

class="btn btn-danger"

onclick="addToCart('${food._id}')">

<i class="fa-solid fa-cart-plus"></i>

</button>

</div>

</div>

</div>

</div>

`;

    });

}
/* =====================================
   Search + Filter
===================================== */

function filterFoods() {

    const keyword = searchFood.value.toLowerCase();

    const filtered = allFoods.filter(food => {

        const matchName =
            food.name.toLowerCase().includes(keyword);

        const matchCategory =
            selectedCategory === "" ||
            food.category?.name === selectedCategory;

        return matchName && matchCategory;

    });

    displayFoods(filtered);

}

searchFood.addEventListener("keyup", filterFoods);

/* =====================================
   Add To Cart
===================================== */

function addToCart(id) {

    const food = allFoods.find(item => item._id === id);

    if (!food) {

        if (typeof showToast === "function") {

            showToast("Food not found", "error");

        }

        return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item._id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    if (typeof showToast === "function") {

        showToast(`🍔 ${food.name} added to cart`);

    }

}

/* =====================================
   Cart Count
===================================== */

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

    });

    const badge = document.getElementById("cartCount");

    if (badge) {

        badge.innerHTML = totalQuantity;

    }

}

/* =====================================
   Scroll To Top
===================================== */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("shadow");

    } else {

        navbar.classList.remove("shadow");

    }

});

/* =====================================
   Initial Load
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCategories();

    loadFoods();

    updateCartCount();

});