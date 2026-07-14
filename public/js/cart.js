/*
=========================================================
 Cart Module
---------------------------------------------------------
 Features
 ✔ Load Cart
 ✔ Display Cart
 ✔ Increase Quantity
 ✔ Decrease Quantity
 ✔ Remove Item
 ✔ Grand Total
=========================================================
*/

// =====================================
// Load Cart from Local Storage
// =====================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartContainer");
const grandTotal = document.getElementById("grandTotal");


// =====================================
// Display Cart
// =====================================

function loadCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="alert alert-warning text-center">

                Your Cart is Empty

            </div>

        `;

        grandTotal.innerText = "0";

        return;

    }

    let total = 0;

    cart.forEach((item, index) => {

        const subTotal = item.price * item.quantity;

        total += subTotal;

        cartContainer.innerHTML += `

        <div class="card mb-3 shadow">

            <div class="row g-0 align-items-center">

                <div class="col-md-2 text-center">

                    <img

                    src="${item.image}"

                    class="img-fluid rounded"

                    style="height:120px;width:120px;object-fit:cover;">

                </div>

                <div class="col-md-4">

                    <div class="card-body">

                        <h5>${item.name}</h5>

                        <p>₹${item.price}</p>

                    </div>

                </div>

                <div class="col-md-3 text-center">

                    <button

                    class="btn btn-danger"

                    onclick="decreaseQty(${index})">

                    -

                    </button>

                    <span class="mx-3 fw-bold">

                    ${item.quantity}

                    </span>

                    <button

                    class="btn btn-success"

                    onclick="increaseQty(${index})">

                    +

                    </button>

                </div>

                <div class="col-md-2">

                    <h5>

                    ₹${subTotal}

                    </h5>

                </div>

                <div class="col-md-1 text-center">

                    <button

                    class="btn btn-outline-danger"

                    onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    grandTotal.innerText = total;

}


// =====================================
// Increase Quantity
// =====================================

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();

}


// =====================================
// Decrease Quantity
// =====================================

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// =====================================
// Remove Item
// =====================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// =====================================
// Save Cart
// =====================================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}


// =====================================
// Initial Load
// =====================================

loadCart();