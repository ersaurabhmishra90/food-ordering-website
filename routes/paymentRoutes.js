/*
=========================================================
 Payment Routes
=========================================================
*/

const express = require("express");

const router = express.Router();


const {

    createOrder,

    getKey,
    verifyPayment

} = require("../controllers/paymentController");


// ==========================================
// Get Razorpay Key
// ==========================================

router.get("/key", getKey);


// ==========================================
// Create Razorpay Order
// ==========================================

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;