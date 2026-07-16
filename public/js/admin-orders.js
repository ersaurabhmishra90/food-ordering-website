/*
=========================================================
 Admin Orders Module
---------------------------------------------------------
✔ Load Orders
✔ Search Orders
✔ Update Status
✔ Toast
=========================================================
*/

const ORDER_API = "/api/order";

const ordersTable = document.getElementById("ordersTable");

const searchOrder = document.getElementById("searchOrder");

let allOrders = [];

// =====================================
// Load Orders
// =====================================

async function loadOrders() {

    ordersTable.innerHTML = `

        <div class="text-center p-5">

            <div class="spinner-border text-success"></div>

            <p class="mt-3">

                Loading Orders...

            </p>

        </div>

    `;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(ORDER_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const data = await response.json();

        if (!response.ok) {

            showToast(data.message, "error");

            ordersTable.innerHTML = "";

            return;

        }

        allOrders = data.orders;

        renderOrders(allOrders);

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

}

// =====================================
// Render Orders
// =====================================

function renderOrders(orders) {

    if (!orders.length) {

        ordersTable.innerHTML = `

            <div class="alert alert-warning text-center">

                No Orders Found

            </div>

        `;

        return;

    }

    let html = `

<div class="table-responsive">

<table class="table table-bordered table-hover align-middle">

<thead class="table-dark">

<tr>

<th>#</th>

<th>Customer</th>

<th>Items</th>

<th>Total</th>

<th>Payment</th>

<th>Status</th>

<th>Date</th>

</tr>

</thead>

<tbody>

`;

    orders.forEach((order, index) => {

        let items = "";

        order.items.forEach(item => {

            items += `

${item.name}

(x${item.quantity})<br>

`;

        });

        let paymentBadge =

            order.paymentStatus === "Paid"

                ? "success"

                : "warning";

        let statusBadge = "secondary";

        if (order.status === "Pending")

            statusBadge = "warning";

        else if (order.status === "Preparing")

            statusBadge = "primary";

        else if (order.status === "Out for Delivery")

            statusBadge = "info";

        else if (order.status === "Delivered")

            statusBadge = "success";

        else if (order.status === "Cancelled")

            statusBadge = "danger";

        html += `

<tr>

<td>${index + 1}</td>

<td>

<strong>${order.customerName}</strong>

<br>

${order.phone}

<br>

<small>${order.address}</small>

</td>

<td>${items}</td>

<td>

<strong>

₹${order.total}

</strong>

</td>

<td>

<span class="badge bg-${paymentBadge}">

${order.paymentStatus}

</span>

</td>

<td>

<span class="badge bg-${statusBadge} mb-2">

${order.status}

</span>

<br>

<select

class="form-select form-select-sm"

onchange="updateStatus('${order._id}',this.value)">

<option value="Pending"

${order.status==="Pending"?"selected":""}>

Pending

</option>

<option value="Preparing"

${order.status==="Preparing"?"selected":""}>

Preparing

</option>

<option value="Out for Delivery"

${order.status==="Out for Delivery"?"selected":""}>

Out for Delivery

</option>

<option value="Delivered"

${order.status==="Delivered"?"selected":""}>

Delivered

</option>

<option value="Cancelled"

${order.status==="Cancelled"?"selected":""}>

Cancelled

</option>

</select>

</td>

<td>

${new Date(order.createdAt).toLocaleString()}

</td>

</tr>

`;

    });
        html += `

</tbody>

</table>

</div>

`;

    ordersTable.innerHTML = html;

}

// =====================================
// Update Order Status
// =====================================

async function updateStatus(id, status) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${ORDER_API}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify({

                status

            })

        });

        const data = await response.json();

        if (data.success) {

            showToast("Order Status Updated Successfully", "success");

            loadOrders();

        }

        else {

            showToast(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

}

// =====================================
// Search Orders
// =====================================

searchOrder.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = allOrders.filter(order =>

        order.customerName.toLowerCase().includes(keyword) ||

        order.phone.includes(keyword) ||

        order.address.toLowerCase().includes(keyword)

    );

    renderOrders(filtered);

});

// =====================================
// Initial Load
// =====================================

loadOrders();