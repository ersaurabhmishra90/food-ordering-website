const API = "/api/dashboard";

async function loadDashboard() {

    try {

        const response = await fetch(API, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

        const data = await response.json();
        if (!response.ok) {

    showToast("Unauthorized Access", "error");

    setTimeout(() => {

        window.location.href = "/login";

    }, 1000);

    return;

}

        // Dashboard Cards
        document.getElementById("totalOrders").innerText = data.totalOrders;
        document.getElementById("totalRevenue").innerText = data.totalRevenue;
        document.getElementById("totalFoods").innerText = data.totalFoods;
        document.getElementById("totalCategories").innerText = data.totalCategories;

        // Recent Orders
        const tbody = document.getElementById("recentOrders");

        tbody.innerHTML = "";

        data.recentOrders.forEach(order => {

            tbody.innerHTML += `
                <tr>
                    <td>${order.customerName}</td>
                    <td>${order.phone}</td>
                    <td>₹${order.total}</td>
                    <td>${order.status}</td>
                    <td>${order.paymentStatus}</td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadDashboard();