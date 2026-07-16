// =====================================
// HTML Elements
// =====================================

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
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
// Login
// =====================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const passwordValue = password.value.trim();

    // Validation

    if (!email || !passwordValue) {

        showToast("Please fill all fields", "warning");

        return;

    }

    loginBtn.disabled = true;

    loginBtn.innerHTML =

        `<span class="spinner-border spinner-border-sm"></span> Logging In...`;

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                password: passwordValue

            })

        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            showToast("Login Successful", "success");

            setTimeout(() => {

                if (data.user.role === "admin") {

                    window.location.href = "/admin/dashboard";

                } else {

                    window.location.href = "/";

                }

            }, 1000);

        } else {

            showToast(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

    loginBtn.disabled = false;

    loginBtn.innerHTML =

        `<i class="fa-solid fa-right-to-bracket"></i> Login`;

});