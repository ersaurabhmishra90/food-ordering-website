/*
=========================================
 Cloudinary Configuration
-----------------------------------------
 This file connects our project to
 Cloudinary using credentials stored
 in the .env file.
=========================================
*/

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET

});

// Export configured Cloudinary
module.exports = cloudinary;