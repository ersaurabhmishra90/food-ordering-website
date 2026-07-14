/*
=========================================
 Upload Middleware
-----------------------------------------
This middleware uploads images directly
to Cloudinary using Multer.
=========================================
*/

const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// Create Cloudinary Storage
const storage = new CloudinaryStorage({

    cloudinary,

    params: {

        folder: "food-ordering",

        allowed_formats: ["jpg", "jpeg", "png", "webp"]

    }

});

// Create Multer Upload
const upload = multer({

    storage

});

// Export Upload Middleware
module.exports = upload;