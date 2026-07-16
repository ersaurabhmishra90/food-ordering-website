/*
=========================================================
 Dashboard Controller
=========================================================
*/

const Order = require("../models/Order");
const Food = require("../models/Food");
const Category = require("../models/Category");

exports.getDashboard = async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        const totalFoods = await Food.countDocuments();

        const totalCategories = await Category.countDocuments();

        const revenue = await Order.aggregate([

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$total"

                    }

                }

            }

        ]);

        const recentOrders = await Order.find()

            .sort({ createdAt: -1 })

            .limit(5);

        res.json({

            success: true,

            totalOrders,

            totalFoods,

            totalCategories,

            totalRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0,

            recentOrders

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