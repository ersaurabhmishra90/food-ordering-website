// =====================================
// HTML Elements
// =====================================

const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// =====================================
// Show / Hide Password
// =====================================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            `<i class="fa-solid fa-eye-slash"></i>`;

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            `<i class="fa-solid fa-eye"></i>`;

    }

});

// =====================================
// Register
// =====================================

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        password: document.getElementById("password").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        address: document.getElementById("address").value.trim()

    };

    // ==========================
    // Validation
    // ==========================

    if (!user.name || !user.email || !user.password || !user.phone || !user.address) {

        showToast("Please fill all fields", "warning");

        return;

    }

    if (!/^[A-Za-z ]{3,50}$/.test(user.name)) {

        showToast("Enter a valid name", "warning");

        return;

    }

    if (!/^[6-9]\d{9}$/.test(user.phone)) {

        showToast("Enter a valid 10-digit mobile number", "warning");

        return;

    }

    if (user.password.length < 6) {

        showToast("Password must be at least 6 characters", "warning");

        return;

    }

    // ==========================
    // Loading
    // ==========================

    registerBtn.disabled = true;

    registerBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Creating Account...
    `;

    try {

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if (data.success) {

            showToast("Registration Successful", "success");

            registerForm.reset();

            setTimeout(() => {

                window.location.href = "/login";

            }, 1500);

        }

        else {

            showToast(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

    registerBtn.disabled = false;

    registerBtn.innerHTML = `
        <i class="fa-solid fa-user-plus"></i>
        Create Account
    `;

});