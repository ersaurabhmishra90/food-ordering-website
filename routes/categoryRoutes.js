/*
=========================================
 Category Routes
-----------------------------------------
 Protected Category APIs
=========================================
*/

const express = require("express");

const router = express.Router();

const {

    authMiddleware,

    adminMiddleware

} = require("../middleware/authMiddleware");

const {

    addCategory,

    getCategories,

    updateCategory,

    deleteCategory

} = require("../controllers/categoryController");

// =========================================
// Get Categories (Public)
// =========================================

router.get(

    "/",

    getCategories

);

// =========================================
// Add Category (Admin Only)
// =========================================

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    addCategory

);

// =========================================
// Update Category (Admin Only)
// =========================================

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    updateCategory

);

// =========================================
// Delete Category (Admin Only)
// =========================================

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteCategory

);

module.exports = router;