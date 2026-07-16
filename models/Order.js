/*
=========================================================
 Order Model
---------------------------------------------------------
 Stores all customer orders
=========================================================
*/

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(


    {
        user: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true

},

        customerName: {

            type: String,

            required: true

        },

        phone: {

            type: String,

            required: true

        },

        address: {

            type: String,

            required: true

        },

        items: [

            {

                foodId: {

                    type: mongoose.Schema.Types.ObjectId,

                    ref: "Food"

                },

                name: {

                    type: String,

                    required: true

                },

                image: {

                    type: String

                },

                price: {

                    type: Number,

                    required: true

                },

                quantity: {

                    type: Number,

                    required: true,

                    default: 1

                }

            }

        ],

        total: {

            type: Number,

            required: true

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Preparing",

                "Out for Delivery",

                "Delivered",

                "Cancelled"

            ],

            default: "Pending"

        },

        // =====================================
        // Payment Details
        // =====================================

        paymentId: {

            type: String,

            default: ""

        },

        razorpayOrderId: {

            type: String,

            default: ""

        },

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Failed"

            ],

            default: "Pending"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model("Order", orderSchema);