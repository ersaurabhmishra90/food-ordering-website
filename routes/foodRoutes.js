/*
=========================================
 Food Routes
-----------------------------------------
This file contains all Food APIs.
=========================================
*/

const express = require("express");

const router = express.Router();

// Upload Middleware
const upload = require("../middleware/upload");

// Food Controller
const {

    addFood,

    getFoods,

    updateFood,

    deleteFood

} = require("../controllers/foodController");


// =========================================
// Add Food with Image Upload
// =========================================

router.post(

    "/",

    upload.single("image"),

    addFood

);


// =========================================
// Get All Foods
// =========================================

router.get(

    "/",

    getFoods

);


// =========================================
// Update Food
// =========================================

router.put(

    "/:id",

    upload.single("image"),

    updateFood

);


// =========================================
// Delete Food
// =========================================

router.delete(

    "/:id",

    deleteFood

);


// Export Router

module.exports = router;