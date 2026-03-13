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
        req.user = payload;
        next();
    }   catch(err) {
        res.status(401).json({
            error: "Invalid or Expired Token"
        })
    }
};