/*
=========================================================
 FoodExpress Pro
 Cart Module
=========================================================
*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartContainer");
const grandTotal = document.getElementById("grandTotal");

/* =====================================
   Toast Helper
===================================== */

function toast(message, type = "success") {

    if (typeof showToast === "function") {

        showToast(message, type);

    } else {

        console.log(message);

    }

}

/* =====================================
   Update Cart Badge
===================================== */

function updateCartCount() {

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.innerHTML = total;

}

/* =====================================
   Save Cart
===================================== */

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    loadCart();

}

/* =====================================
   Empty Cart
===================================== */

function emptyCartHTML() {

    return `

<div class="text-center py-5">

<i

class="fa-solid fa-cart-shopping"

style="font-size:90px;color:#ff4d4f">

</i>

<h2 class="mt-4">

Your Cart is Empty

</h2>

<p class="text-muted">

Looks like you haven't added anything yet.

</p>

<a

href="/menu"

class="btn btn-danger btn-lg mt-3">

Browse Menu

</a>

</div>

`;

}

/* =====================================
   Load Cart
===================================== */

function loadCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = emptyCartHTML();

        grandTotal.innerHTML = "0";

        updateCartCount();

        return;

    }

    let total = 0;

    cart.forEach((item, index) => {

        const subtotal =

            item.price *

            item.quantity;

        total += subtotal;

        cartContainer.innerHTML += `

<div class="card food-card shadow-lg mb-4">

<div class="row align-items-center g-0">

<div class="col-lg-2 col-md-3 text-center p-3">

<img

src="${item.image}"

class="img-fluid rounded"

style="height:140px;width:140px;object-fit:cover;">

</div>

<div class="col-lg-4 col-md-4">

<div class="card-body">

<h4>

${item.name}

</h4>

<p class="text-muted">

${item.category?.name || "Food"}

</p>

<h5 class="text-danger">

₹${item.price}

</h5>

</div>

</div>

<div class="col-lg-3 col-md-3 text-center">

<div class="d-flex justify-content-center align-items-center">

<button

class="btn btn-outline-danger"

onclick="decreaseQty(${index})">

<i class="fa-solid fa-minus"></i>

</button>

<span

class="mx-3 fw-bold fs-5">

${item.quantity}

</span>

<button

class="btn btn-danger"

onclick="increaseQty(${index})">

<i class="fa-solid fa-plus"></i>

</button>

</div>

</div>

<div class="col-lg-2 col-md-2 text-center">

<h4>

₹${subtotal}

</h4>

</div>

<div class="col-lg-1 text-center">

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

    grandTotal.innerHTML = total;

}
/* =====================================
   Increase Quantity
===================================== */

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();

    toast("➕ Quantity Updated");

}

/* =====================================
   Decrease Quantity
===================================== */

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

        toast("➖ Quantity Updated");

    } else {

        const itemName = cart[index].name;

        cart.splice(index, 1);

        toast(`🗑 ${itemName} Removed`, "warning");

    }

    saveCart();

}

/* =====================================
   Remove Item
===================================== */

function removeItem(index) {

    const itemName = cart[index].name;

    cart.splice(index, 1);

    saveCart();

    toast(`🗑 ${itemName} Removed`, "warning");

}

/* =====================================
   Clear Cart
===================================== */

function clearCart() {

    if (cart.length === 0) {

        toast("Cart is already empty", "warning");

        return;

    }

    cart = [];

    saveCart();

    toast("🧹 Cart Cleared");

}

/* =====================================
   Calculate Total
===================================== */

function calculateTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}

/* =====================================
   Proceed To Checkout
===================================== */

function proceedCheckout() {

    if (cart.length === 0) {

        toast("Your cart is empty", "warning");

        return;

    }

    window.location.href = "/checkout";

}

/* =====================================
   Initial Load
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    updateCartCount();

});

/* =====================================
   Export (Future Use)
===================================== */

window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.proceedCheckout = proceedCheckout;
