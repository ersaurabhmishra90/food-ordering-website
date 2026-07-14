/*
=========================================================
 Food Controller
---------------------------------------------------------
 Handles:
 ✔ Add Food
 ✔ Get Foods
 ✔ Update Food
 ✔ Delete Food
 ✔ Cloudinary Image Upload
=========================================================
*/

const Food = require("../models/Food");


// =====================================================
// Add Food
// =====================================================

exports.addFood = async (req, res) => {

    try {

        const {

            name,
            price,
            category,
            description,
            available

        } = req.body;

        // Image URL from Cloudinary
        let image = "";

        if (req.file) {

            image = req.file.path;

        }

        const food = await Food.create({

            name,

            price,

            category,

            image,

            description,

            available

        });

        res.status(201).json({

            success: true,

            message: "Food Added Successfully",

            food

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
// Get All Foods
// =====================================================

exports.getFoods = async (req, res) => {

    try {
        console.log("===== BODY =====");
    console.log(req.body);

    console.log("===== FILE =====");
    console.log(req.file);

        const foods = await Food.find()

            .populate("category")

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: foods.length,

            foods

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
// Update Food
// =====================================================

exports.updateFood = async (req, res) => {

    try {

        const { id } = req.params;

        const updateData = {

            ...req.body

        };

        // If a new image is uploaded,
        // replace the old image URL

        if (req.file) {

            updateData.image = req.file.path;

        }

        const food = await Food.findByIdAndUpdate(

            id,

            updateData,

            {

                new: true,

                runValidators: true

            }

        );

        if (!food) {

            return res.status(404).json({

                success: false,

                message: "Food Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Food Updated Successfully",

            food

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
// Delete Food
// =====================================================

exports.deleteFood = async (req, res) => {

    try {

        const { id } = req.params;

        const food = await Food.findByIdAndDelete(id);

        if (!food) {

            return res.status(404).json({

                success: false,

                message: "Food Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Food Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};