const express = require("express");
const path = require("path");
require("dotenv").config();


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
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
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

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


app.get("/my-orders", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "my-orders.html"));

});

app.get("/admin/orders", (req, res) => {

    res.sendFile(path.join(__dirname, "views/admin/orders.html"));

});

app.get("/admin/dashboard",(req,res)=>{

    res.sendFile(path.join(__dirname,"views/admin/dashboard.html"));

});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});