const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: "Access Denied - no token"
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(payload.userId);

        if (!user) {
            return res.status(401).json({
                message: "User  not found!"
            })
        }
        req.user = payload;
        next();
    }   catch(err) {
        res.status(401).json({
            error: "Invalid or Expired Token"
        })
    }
};

module.exports = requireAuth; 