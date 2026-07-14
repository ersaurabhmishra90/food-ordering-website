/*
=========================================================
 Order Controller
---------------------------------------------------------
 Handles:
 ✔ Place Order
 ✔ Get All Orders
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
            total

        } = req.body;

        const order = await Order.create({

            customerName,

            phone,

            address,

            items,

            total

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
// Get All Orders
// =====================================================

exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    }

    catch (error) {

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

        res.status(200).json({

            success: true,

            order

        });

    }

    catch (error) {

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

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                status: req.body.status

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

            message: "Status Updated",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};