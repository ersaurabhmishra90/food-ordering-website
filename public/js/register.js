document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value

    };

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

            alert("Registration Successful");

            window.location.href = "/login";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});