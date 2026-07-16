/*
=========================================
 Food Routes
-----------------------------------------
 Protected Food APIs
=========================================
*/

const express = require("express");

const router = express.Router();

// Upload Middleware
const upload = require("../middleware/upload");

// Authentication Middleware
const {

    authMiddleware,

    adminMiddleware

} = require("../middleware/authMiddleware");

// Food Controller
const {

    addFood,

    getFoods,

    updateFood,

    deleteFood

} = require("../controllers/foodController");


// =========================================
// Get All Foods (Public)
// =========================================

router.get(

    "/",

    getFoods

);


// =========================================
// Add Food (Admin Only)
// =========================================

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    upload.single("image"),

    addFood

);


// =========================================
// Update Food (Admin Only)
// =========================================

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    upload.single("image"),

    updateFood

);


// =========================================
// Delete Food (Admin Only)
// =========================================

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteFood

);

module.exports = router;