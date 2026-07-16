/*
=========================================================
 Authentication Module
=========================================================
*/

// =====================================
// Check Login
// =====================================

function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "/login";

    }

}

// =====================================
// Navbar
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    // Customer Navbar
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const ordersLink = document.getElementById("ordersLink");
    const userName = document.getElementById("userName");

    // Admin Navbar
    const adminName = document.getElementById("adminName");

    if (token && user) {

        // Customer Navbar
        if (loginLink) loginLink.style.display = "none";

        if (logoutLink) logoutLink.style.display = "block";

        if (ordersLink) ordersLink.style.display = "block";

        if (userName) {

            userName.innerHTML = "👤 " + user.name;

        }

        // Admin Navbar
        if (adminName) {

            adminName.innerHTML = "👤 " + user.name;

        }

    }

    else {

        if (loginLink) loginLink.style.display = "block";

        if (logoutLink) logoutLink.style.display = "none";

        if (ordersLink) ordersLink.style.display = "none";

        if (userName) {

            userName.innerHTML = "";

        }

        if (adminName) {

            adminName.innerHTML = "";

        }

    }

});

// =====================================
// Logout
// =====================================

function logout() {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("cart");

    window.location.href = "/login";

}