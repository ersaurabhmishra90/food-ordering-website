/*
=========================================================
 FoodExpress Pro
 Home Page Script
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

function getCategoryIcon(name){

    const icons = {

        Pizza:"🍕",
        Burger:"🍔",
        Drinks:"🥤",
        Dessert:"🍰",
        Snacks:"🍟",
        Biryani:"🍗",
        Chinese:"🍜",
        Momos:"🥟",
        Rolls:"🌯"

    };

    return icons[name] || "🍽";

}

/* =====================================
   Load Categories
===================================== */

async function loadCategories(){

    try{

        const response = await fetch(CATEGORY_API);

        const data = await response.json();

        if(!data.success) return;

        categoryContainer.innerHTML="";

        const allBtn=document.createElement("button");

        allBtn.className="category-btn active";

        allBtn.innerHTML="🍽 All";

        allBtn.onclick=()=>filterByCategory("");

        categoryContainer.appendChild(allBtn);

        data.categories.forEach(category=>{

            const btn=document.createElement("button");

            btn.className="category-btn";

            btn.innerHTML=`${getCategoryIcon(category.name)} ${category.name}`;

            btn.onclick=()=>filterByCategory(category.name);

            categoryContainer.appendChild(btn);

        });

    }

    catch(error){

        console.log(error);

    }

}

/* =====================================
   Filter Category
===================================== */

function filterByCategory(category){

    selectedCategory=category;

    document.querySelectorAll(".category-btn").forEach(btn=>{

        btn.classList.remove("active");

    });

    event.target.classList.add("active");

    filterFoods();

}

/* =====================================
   Load Foods
===================================== */

async function loadFoods(){

    try{

        foodContainer.innerHTML=`

        <div class="col-12 text-center">

            <div class="loader"></div>

        </div>

        `;

        const response=await fetch(FOOD_API);

        const data=await response.json();

        if(!data.success){

            foodContainer.innerHTML="<h3>No Food Found</h3>";

            return;

        }

        allFoods=data.foods;

        displayFoods(allFoods);

    }

    catch(error){

        console.log(error);

    }

}

/* =====================================
   Display Foods
===================================== */

function displayFoods(foods){

    foodContainer.innerHTML="";

    if(foods.length===0){

        foodContainer.innerHTML=`

        <div class="col-12">

        <div class="alert alert-warning text-center">

        No Food Found

        </div>

        </div>

        `;

        return;

    }

    foods.forEach(food=>{

        foodContainer.innerHTML+=`

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

function filterFoods(){

    const keyword=searchFood.value.toLowerCase();

    const filtered=allFoods.filter(food=>{

        const matchName=

        food.name.toLowerCase().includes(keyword);

        const matchCategory=

        selectedCategory==="" ||

        food.category?.name===selectedCategory;

        return matchName && matchCategory;

    });

    displayFoods(filtered);

}

searchFood.addEventListener("keyup",filterFoods);

/* =====================================
   Add To Cart
===================================== */

async function addToCart(id){

    const food=allFoods.find(f=>f._id===id);

    if(!food) return;

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    const existing=cart.find(item=>item._id===id);

    if(existing){

        existing.quantity++;

    }

    else{

        food.quantity=1;

        cart.push(food);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    showToast("🍔 Food added to cart");

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

    document.getElementById("cartCount").innerHTML = totalQuantity;

}

/* =====================================
   Init
===================================== */

loadCategories();

loadFoods();

updateCartCount();