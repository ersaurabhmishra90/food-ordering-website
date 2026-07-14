/*
=========================================================
 Checkout Module
---------------------------------------------------------
 Features
 ✔ Load Cart
 ✔ Show Order Summary
 ✔ Calculate Grand Total
=========================================================
*/

// =====================================
// Load Cart
// =====================================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderSummary = document.getElementById("orderSummary");
const grandTotal = document.getElementById("grandTotal");


// =====================================
// Display Order Summary
// =====================================

function loadSummary() {

    if (cart.length === 0) {

        orderSummary.innerHTML = `

            <div class="alert alert-warning">

                Your Cart is Empty

            </div>

        `;

        grandTotal.innerText = "0";

        return;

    }

    let total = 0;

    orderSummary.innerHTML = "";

    cart.forEach(item => {

        const subTotal = item.price * item.quantity;

        total += subTotal;

        orderSummary.innerHTML += `

            <div class="d-flex justify-content-between border-bottom py-2">

                <div>

                    <strong>${item.name}</strong>

                    <br>

                    Qty : ${item.quantity}

                </div>

                <div>

                    ₹${subTotal}

                </div>

            </div>

        `;

    });

    grandTotal.innerText = total;

}


// =====================================
// Initial Load
// =====================================

loadSummary();

// =====================================
// Checkout Form
// =====================================

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", placeOrder);


// =====================================
// Place Order
// =====================================

async function placeOrder(e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const order = {

        customerName: document.getElementById("customerName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        address: document.getElementById("address").value.trim(),

        items: cart.map(item => ({

            foodId: item._id,

            name: item.name,

            image: item.image,

            price: item.price,

            quantity: item.quantity

        })),

        total: Number(grandTotal.innerText)

    };

    try {

        const response = await fetch("/api/order", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(order)

        });

        const data = await response.json();

        if (data.success) {

            localStorage.removeItem("cart");

            alert("Order Placed Successfully!");

            window.location.href = "/";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}