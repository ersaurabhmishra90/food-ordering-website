/*
=========================================================
 Order Controller
---------------------------------------------------------
 Handles:
 ✔ Place Order
 ✔ Get All Orders (Admin)
 ✔ Get My Orders (Customer)
 ✔ Get Single Order
 ✔ Update Order Status
=========================================================
*/

const Order = require("../models/Order");

// =====================================================
// Place Order
// =====================================================

exports.placeOrder = async (req, res) => {

    try {

        const {

            customerName,
            phone,
            address,
            items,
            total,
            status,
            paymentId,
            razorpayOrderId,
            paymentStatus

        } = req.body;

        const order = await Order.create({

            user: req.user.id,

            customerName,

            phone,

            address,

            items,

            total,

            status: status || "Pending",

            paymentId: paymentId || "",

            razorpayOrderId: razorpayOrderId || "",

            paymentStatus: paymentStatus || "Paid"

        });

        res.status(201).json({

            success: true,

            message: "Order Placed Successfully",

            order

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================================
// Get Logged In User Orders
// =====================================================

exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================================
// Get All Orders (Admin)
// =====================================================

exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================================
// Get Single Order
// =====================================================

exports.getOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        // Admin can access every order
        // Customer can access only own order

        if (

            req.user.role !== "admin" &&

            order.user.toString() !== req.user.id

        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================================
// Update Order Status
// =====================================================

exports.updateStatus = async (req, res) => {

    try {

        const validStatus = [

            "Pending",

            "Preparing",

            "Out for Delivery",

            "Delivered",

            "Cancelled"

        ];

        const status = validStatus.includes(req.body.status)

            ? req.body.status

            : "Pending";

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                status

            },

            {

                new: true

            }

        );

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Status Updated Successfully",

            order

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};