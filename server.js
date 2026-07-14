const express = require("express");
const path = require("path");
require("dotenv").config();

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// login route

app.get("/login",(req,res)=>{

    res.sendFile(path.join(__dirname,"views","login.html"));

});

// register route
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

//  categories route
app.get("/admin/category", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin", "category.html"));
});

// food routes
app.get("/admin/food", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin", "food.html"));
});

// meenu routes

app.get("/menu", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "menu.html"));

});

app.get("/cart", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "cart.html"));

});

//checout routes
app.get("/checkout", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "checkout.html"));

});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});