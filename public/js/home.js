/*
=========================================================
 Home Page
---------------------------------------------------------
 Features
 ✔ Load Foods
 ✔ Display Food Cards
 ✔ Cloudinary Images
 ✔ Add To Cart Button (Coming Next)
=========================================================
*/

// =====================================
// API URL
// =====================================

const FOOD_API = "/api/food";


// =====================================
// HTML Container
// =====================================

const foodContainer = document.getElementById("foodContainer");


// =====================================
// Load Foods
// =====================================

async function loadFoods() {

    try {

        const response = await fetch(FOOD_API);

        const data = await response.json();

        foodContainer.innerHTML = "";

        if (!data.success || data.foods.length === 0) {

            foodContainer.innerHTML = `

                <div class="col-12 text-center">

                    <h4>No Food Available</h4>

                </div>

            `;

            return;

        }

        data.foods.forEach(food => {

            foodContainer.innerHTML += `

                <div class="col-md-4 col-lg-3 mb-4">

                    <div class="card shadow h-100">

                        <img

                            src="${food.image}"

                            class="card-img-top"

                            style="height:220px;object-fit:cover;">

                        <div class="card-body d-flex flex-column">

                            <h5>${food.name}</h5>

                            <p class="text-muted">

                                ${food.description}

                            </p>

                            <h4 class="text-success">

                                ₹${food.price}

                            </h4>

                            <button

                                class="btn btn-primary mt-auto"

                                onclick="addToCart('${food._id}')">

                                <i class="fa-solid fa-cart-shopping"></i>

                                Add To Cart

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}



// Add Food To Cart
// =====================================================

async function addToCart(id) {

    try {

        const response = await fetch(FOOD_API);

        const data = await response.json();

        const food = data.foods.find(item => item._id === id);

        if (!food) {

            alert("Food not found");

            return;

        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item._id === id);

        if (existing) {

            existing.quantity++;

            alert(`Quantity Updated (${existing.quantity})`);

        } else {

            food.quantity = 1;

            cart.push(food);

            alert("Food Added To Cart");

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

    }

    catch (error) {

        console.log(error);

    }

}

// =====================================================
// Update Cart Count
// =====================================================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cartCount").innerHTML = cart.length;

}

// =====================================
// Initial Load
// =====================================
loadFoods();

updateCartCount();