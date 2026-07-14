document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if(data.success){

            localStorage.setItem("token",data.token);

            localStorage.setItem("user",JSON.stringify(data.user));

            alert("Login Successful");

            window.location.href="/";

        }

        else{

            alert(data.message);

        }

    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }

});