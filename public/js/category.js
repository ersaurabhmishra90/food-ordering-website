const API_URL = "/api/category";

let editId = null;

const form = document.getElementById("categoryForm");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("categoryTable");

// ==============================
// Load Categories
// ==============================

async function loadCategories() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        tableBody.innerHTML = "";

        if (!data.success || data.categories.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No Categories Found
                    </td>
                </tr>
            `;

            return;
        }

        data.categories.forEach((category, index) => {

            tableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${category.name}</td>

                <td>${category.description}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm me-2"
                        onclick="editCategory('${category._id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteCategory('${category._id}')">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==============================
// Add / Update Category
// ==============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Please Wait...";

    const category = {

        name: document.getElementById("name").value.trim(),

        image: document.getElementById("image").value.trim(),

        description: document.getElementById("description").value.trim()

    };

    try {

        let response;

        if (editId == null) {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(category)

            });

        }

        else {

            response = await fetch(`${API_URL}/${editId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(category)

            });

        }

        const data = await response.json();

        if (data.success) {

            alert(editId ? "Category Updated Successfully" : "Category Added Successfully");

            form.reset();

            editId = null;

            submitBtn.innerHTML = "Add Category";

            loadCategories();

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

    submitBtn.disabled = false;

});

// ==============================
// Edit Category
// ==============================

async function editCategory(id) {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        const category = data.categories.find(item => item._id === id);

        if (!category) return;

        document.getElementById("name").value = category.name;

        document.getElementById("image").value = category.image;

        document.getElementById("description").value = category.description;

        editId = id;

        submitBtn.innerHTML = "Update Category";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==============================
// Delete Category
// ==============================

async function deleteCategory(id) {

    if (!confirm("Delete this category?")) return;

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        if (data.success) {

            alert("Category Deleted Successfully");

            loadCategories();

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete category.");

    }

}

// ==============================
// Initial Load
// ==============================

loadCategories();