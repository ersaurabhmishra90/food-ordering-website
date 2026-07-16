const jwt = require("jsonwebtoken");

// =====================================
// Login Authentication
// =====================================

exports.authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Authorization token missing"

            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or Expired Token"

        });

    }

};

// =====================================
// Admin Authorization
// =====================================

exports.adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message: "Admin Access Only"

        });

    }

    next();

};