const express = require("express");

const router = express.Router();

const {

    authMiddleware,

    adminMiddleware

} = require("../middleware/authMiddleware");

const {

    getDashboard

} = require("../controllers/dashboardController");

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getDashboard

);

module.exports = router;