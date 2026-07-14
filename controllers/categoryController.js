const Category = require("../models/Category");

// ===============================
// Add Category
// ===============================
exports.addCategory = async (req, res) => {

    try {

        const { name, image, description } = req.body;

        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name,
            image,
            description
        });

        res.status(201).json({
            success: true,
            message: "Category Added Successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get All Categories
// ===============================
exports.getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Update Category
// ===============================
exports.updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, image, description, isActive } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                image,
                description,
                isActive
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Category
// ===============================
exports.deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};