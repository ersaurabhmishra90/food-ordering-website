/*
=========================================================
 FoodExpress Pro
 My Orders Module
=========================================================
*/

const ORDER_API = "/api/order/my-orders";

const ordersContainer = document.getElementById("ordersContainer");

/* =====================================
   Toast
===================================== */

function toast(message, type = "success") {

    if (typeof showToast === "function") {

        showToast(message, type);

    } else {

        console.log(message);

    }

}

/* =====================================
   Status Badge
===================================== */

function getStatusBadge(status) {

    switch (status) {

        case "Pending":
            return "warning";

        case "Preparing":
            return "primary";

        case "Out for Delivery":
            return "info";

        case "Delivered":
            return "success";

        case "Cancelled":
            return "danger";

        default:
            return "secondary";

    }

}

/* =====================================
   Payment Badge
===================================== */

function getPaymentBadge(status) {

    switch (status) {

        case "Paid":
            return "success";

        case "Failed":
            return "danger";

        default:
            return "warning";

    }

}

/* =====================================
   Empty State
===================================== */

function emptyOrders() {

    ordersContainer.innerHTML = `

    <div class="text-center py-5">

        <i class="fa-solid fa-box-open"

        style="font-size:90px;color:#ff4d4f"></i>

        <h2 class="mt-4">

            No Orders Yet

        </h2>

        <p class="text-muted">

            Order your favourite food now.

        </p>

        <a href="/menu"

        class="btn btn-danger btn-lg mt-3">

            Browse Menu

        </a>

    </div>

    `;

}

/* =====================================
   Load Orders
===================================== */

async function loadOrders() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(ORDER_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const data = await response.json();

        ordersContainer.innerHTML = "";

        if (!data.success || data.orders.length === 0) {

            emptyOrders();

            return;

        }

        data.orders.forEach((order, index) => {

            const badge = getStatusBadge(order.status);

            const payment = getPaymentBadge(order.paymentStatus);

            let itemsHTML = "";

            order.items.forEach(item => {

                itemsHTML += `

<div class="d-flex justify-content-between align-items-center border-bottom py-3">

<div class="d-flex align-items-center">

<img

src="${item.image}"

class="rounded me-3"

style="width:70px;height:70px;object-fit:cover;">

<div>

<h6 class="mb-1">

${item.name}

</h6>

<small>

Qty : ${item.quantity}

</small>

</div>

</div>

<strong>

₹${item.price * item.quantity}

</strong>

</div>

`;

            });

            ordersContainer.innerHTML += `
            <div class="card shadow-lg border-0 rounded-4 mb-4">

    <div class="card-header bg-white d-flex justify-content-between align-items-center">

        <div>

            <h5 class="mb-0">

                Order #${index + 1}

            </h5>

            <small class="text-muted">

                ${new Date(order.createdAt).toLocaleString()}

            </small>

        </div>

        <div>

            <span class="badge bg-${badge}">

                ${order.status}

            </span>

        </div>

    </div>

    <div class="card-body">

        ${itemsHTML}

        <hr>

        <div class="row">

            <div class="col-md-6">

                <p>

                    <strong>Customer :</strong>

                    ${order.customerName}

                </p>

                <p>

                    <strong>Phone :</strong>

                    ${order.phone}

                </p>

                <p>

                    <strong>Payment :</strong>

                    <span class="badge bg-${payment}">

                        ${order.paymentStatus}

                    </span>

                </p>

            </div>

            <div class="col-md-6 text-md-end">

                <p>

                    <strong>Delivery Address</strong>

                </p>

                <p class="text-muted">

                    ${order.address}

                </p>

                <h3 class="text-danger">

                    ₹${order.total}

                </h3>

            </div>

        </div>

    </div>

</div>

`;

        });

    }

    catch (error) {

        console.error(error);

        ordersContainer.innerHTML = `

<div class="alert alert-danger text-center">

Unable to load your orders.

</div>

`;

        toast("Unable to load orders", "error");

    }

}

/* =====================================
   Refresh Orders
===================================== */

function refreshOrders() {

    loadOrders();

    toast("Orders refreshed");

}

/* =====================================
   Auto Refresh Every 30 Seconds
===================================== */

setInterval(() => {

    loadOrders();

}, 30000);

/* =====================================
   Initial Load
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

});

/* =====================================
   Export
===================================== */

window.refreshOrders = refreshOrders;