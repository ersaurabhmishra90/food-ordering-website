// Check Login
function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "/login";

    }

}

// Logout
function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "/login";

}