const express = require("express");

const router = express.Router();

const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleware");

const {
    placeOrder,
    getOrders,
    getMyOrders,
    getOrder,
    updateStatus
} = require("../controllers/orderController");

// =====================================
// Customer Routes
// =====================================

// Place Order
router.post(
    "/",
    authMiddleware,
    placeOrder
);

// Logged In User Orders
router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);

// Single Order (Logged In User)
router.get(
    "/:id",
    authMiddleware,
    getOrder
);

// =====================================
// Admin Routes
// =====================================

// All Orders
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getOrders
);

// Update Order Status
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateStatus
);

module.exports = router;