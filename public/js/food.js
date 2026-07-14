/*
=========================================================
 Food Management (Cloudinary Version)
---------------------------------------------------------
 Part 1

 ✔ Load Categories
 ✔ Load Foods
 ✔ Display Food Images
 ✔ Global Variables

=========================================================
*/

// ========================================
// API URLs
// ========================================

const FOOD_API = "/api/food";
const CATEGORY_API = "/api/category";


// ========================================
// Global Variables
// ========================================

let editFoodId = null;


// ========================================
// HTML Elements
// ========================================

const foodForm = document.getElementById("foodForm");
const submitBtn = document.getElementById("submitBtn");
const foodTable = document.getElementById("foodTable");
const categorySelect = document.getElementById("category");


// ========================================
// Load Categories
// ========================================

async function loadCategories() {

    try {

        const response = await fetch(CATEGORY_API);

        const data = await response.json();

        categorySelect.innerHTML =
            `<option value="">Select Category</option>`;

        data.categories.forEach(category => {

            categorySelect.innerHTML += `

                <option value="${category._id}">

                    ${category.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}


// ========================================
// Load All Foods
// ========================================

async function loadFoods() {

    try {

        const response = await fetch(FOOD_API);

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

                            style="object-fit:cover;border-radius:8px;">

                    </td>

                    <td>${food.name}</td>

                    <td>₹${food.price}</td>

                    <td>${food.category.name}</td>

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

    }

}

// =====================================================
// Add Food / Update Food
// Uses FormData for Image Upload
// =====================================================

foodForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Uploading...";

    // Create FormData object
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value.trim());

    formData.append("price", document.getElementById("price").value);

    formData.append("category", categorySelect.value);

    formData.append("description", document.getElementById("description").value.trim());

    formData.append("available", document.getElementById("available").checked);

    // Selected Image
    const imageFile = document.getElementById("image").files[0];

    if (imageFile) {

        formData.append("image", imageFile);

    }

    try {

        let response;

        // ==========================
        // Add Food
        // ==========================

        if (editFoodId === null) {

            response = await fetch(FOOD_API, {

                method: "POST",

                body: formData

            });

        }

        // ==========================
        // Update Food
        // ==========================

        else {

            response = await fetch(`${FOOD_API}/${editFoodId}`, {

                method: "PUT",

                body: formData

            });

        }

        const data = await response.json();

        if (data.success) {

            alert(editFoodId
                ? "Food Updated Successfully"
                : "Food Added Successfully");

            foodForm.reset();

            editFoodId = null;

            submitBtn.innerHTML = "Add Food";

            await loadFoods();

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

    submitBtn.disabled = false;

});



// =====================================================
// Edit Food
// =====================================================

async function editFood(id) {

    try {

        const response = await fetch(FOOD_API);

        const data = await response.json();

        const food = data.foods.find(item => item._id === id);

        if (!food) return;

        document.getElementById("name").value = food.name;

        document.getElementById("price").value = food.price;

        document.getElementById("description").value = food.description;

        document.getElementById("available").checked = food.available;

        categorySelect.value = food.category._id;

        // NOTE:
        // Browser security does not allow
        // automatically filling a file input.
        // User must select a new image if changing it.

        editFoodId = id;

        submitBtn.innerHTML = "Update Food";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.log(error);

    }

}

/*=========================================================
    FOOD MANAGEMENT MODULE
    Part 3

    ✔ Delete Food
    ✔ Reset Form
    ✔ Initial Load

==========================================================*/


// =====================================================
// Delete Food
// =====================================================

async function deleteFood(id) {

    const confirmDelete = confirm("Are you sure you want to delete this food?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${FOOD_API}/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        if (data.success) {

            alert("Food Deleted Successfully");

            loadFoods();

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}



// =====================================================
// Reset Form
// =====================================================

function resetFoodForm() {

    foodForm.reset();

    editFoodId = null;

    submitBtn.innerHTML = "Add Food";

}



// =====================================================
// Cancel Edit
// =====================================================

function cancelEdit() {

    resetFoodForm();

}



// =====================================================
// Reload Foods
// =====================================================

async function refreshFoods() {

    await loadFoods();

}



// =====================================================
// Initial Load
// =====================================================

window.onload = async () => {

    await loadCategories();

    await loadFoods();

};