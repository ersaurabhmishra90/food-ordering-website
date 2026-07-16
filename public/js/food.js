/*
=========================================================
 Food Management (Secure Version)
=========================================================
*/

const FOOD_API = "/api/food";
const CATEGORY_API = "/api/category";

let editFoodId = null;

const foodForm = document.getElementById("foodForm");
const submitBtn = document.getElementById("submitBtn");
const foodTable = document.getElementById("foodTable");
const categorySelect = document.getElementById("category");

const TOKEN = localStorage.getItem("token");

const AUTH_HEADERS = {
    Authorization: "Bearer " + TOKEN
};

// =====================================
// Toast
// =====================================

function notify(message, type = "success") {

    if (typeof showToast === "function") {

        showToast(message, type);

    } else {

        alert(message);

    }

}

// =====================================
// Load Categories
// =====================================

async function loadCategories() {

    try {

        const response = await fetch(CATEGORY_API + "?t=" + Date.now(), {
    cache: "no-store"
});

        const data = await response.json();

        categorySelect.innerHTML =
            `<option value="">Select Category</option>`;

        if (data.success) {

            data.categories.forEach(category => {

                categorySelect.innerHTML += `

<option value="${category._id}">
${category.name}
</option>

`;

            });

        }

    }

    catch (error) {

        console.log(error);

        notify("Unable to load categories", "error");

    }

}

// =====================================
// Load Foods
// =====================================

async function loadFoods() {

    try {

        const response = await fetch(FOOD_API + "?t=" + Date.now(), {
    cache: "no-store"
});

        const data = await response.json();

        foodTable.innerHTML = "";

        if (!data.success || data.foods.length === 0) {

            foodTable.innerHTML = `

<tr>

<td colspan="6" class="text-center">

No Food Found

</td>

</tr>

`;

            return;

        }

        data.foods.forEach((food, index) => {

            foodTable.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>

<img
src="${food.image}"
width="70"
height="70"
style="object-fit:cover;border-radius:10px;">

</td>

<td>${food.name}</td>

<td>₹${food.price}</td>

<td>${food.category?.name || "-"}</td>

<td>

<button
class="btn btn-warning btn-sm me-2"
onclick="editFood('${food._id}')">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteFood('${food._id}')">

Delete

</button>

</td>

</tr>

`;

        });

    }

    catch (error) {

        console.log(error);

        notify("Unable to load foods", "error");

    }

}

// =====================================
// Add / Update Food
// =====================================

foodForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;

    submitBtn.innerHTML = "Uploading...";

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value.trim());

    formData.append("price", document.getElementById("price").value);

    formData.append("category", categorySelect.value);

    formData.append("description", document.getElementById("description").value.trim());

    formData.append("available", document.getElementById("available").checked);

    const image = document.getElementById("image").files[0];

    if (image) {

        formData.append("image", image);

    }

    try {

        let response;

        if (editFoodId == null) {

            response = await fetch(FOOD_API, {

                method: "POST",

                headers: AUTH_HEADERS,

                body: formData

            });

        }

        else {

            response = await fetch(`${FOOD_API}/${editFoodId}`, {

                method: "PUT",

                headers: AUTH_HEADERS,

                body: formData

            });

        }

        const data = await response.json();

        if (!response.ok) {

            notify(data.message || "Operation Failed", "error");

            submitBtn.disabled = false;

            submitBtn.innerHTML = "Add Food";

            return;

        }

        if (data.success) {

            notify(
                editFoodId
                    ? "Food Updated Successfully"
                    : "Food Added Successfully"
            );

            foodForm.reset();

            editFoodId = null;

            submitBtn.innerHTML = "Add Food";

            submitBtn.disabled = false;

            await loadFoods();

        }

        else {

            notify(data.message, "error");

            submitBtn.disabled = false;

            submitBtn.innerHTML = "Add Food";

        }

    }

    catch (error) {

        console.log(error);

        notify("Server Error", "error");

        submitBtn.disabled = false;

        submitBtn.innerHTML = "Add Food";

    }

});
// =====================================
// Edit Food
// =====================================

async function editFood(id) {

    try {

        const response = await fetch(FOOD_API);

        const data = await response.json();

        const food = data.foods.find(item => item._id === id);

        if (!food) {

            notify("Food not found", "error");

            return;

        }

        document.getElementById("name").value = food.name;

        document.getElementById("price").value = food.price;

        document.getElementById("description").value = food.description || "";

        document.getElementById("available").checked = food.available;

        categorySelect.value = food.category?._id || "";

        editFoodId = id;

        submitBtn.innerHTML = "Update Food";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.log(error);

        notify("Unable to load food details", "error");

    }

}

// =====================================
// Delete Food
// =====================================

async function deleteFood(id) {

    if (!confirm("Are you sure you want to delete this food?")) {

        return;

    }

    try {

        const response = await fetch(`${FOOD_API}/${id}`, {

            method: "DELETE",

            headers: AUTH_HEADERS

        });

        const data = await response.json();

        if (!response.ok) {

            notify(data.message || "Delete failed", "error");

            return;

        }

        if (data.success) {

            notify("Food Deleted Successfully");

            await loadFoods();

        }

        else {

            notify(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        notify("Server Error", "error");

    }

}

// =====================================
// Reset Form
// =====================================

function resetFoodForm() {

    foodForm.reset();

    editFoodId = null;

    submitBtn.disabled = false;

    submitBtn.innerHTML = "Add Food";

}

// =====================================
// Refresh Foods
// =====================================

async function refreshFoods() {

    await loadFoods();

}

// =====================================
// Initial Load
// =====================================

window.onload = async () => {

    await loadCategories();

    await loadFoods();

resetFoodForm();
};