/*
=========================================================
 Order Routes
---------------------------------------------------------
 APIs
 ✔ Place Order
 ✔ Get All Orders
 ✔ Get Single Order
 ✔ Update Order Status
=========================================================
*/

const express = require("express");

const router = express.Router();

const {

    placeOrder,

    getOrders,

    getOrder,

    updateStatus

} = require("../controllers/orderController");


// ==========================================
// Place Order
// ==========================================

router.post("/", placeOrder);


// ==========================================
// Get All Orders
// ==========================================

router.get("/", getOrders);


// ==========================================
// Get Single Order
// ==========================================

router.get("/:id", getOrder);


// ==========================================
// Update Order Status
// ==========================================

router.put("/:id", updateStatus);


// Export Router
module.exports = router;