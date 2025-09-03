import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Failed to authenticate token"
            });
        }
        req.userId = decoded.id;
        req.userRoles = decoded.roles;
        next();
    });
};

export default verifyToken;
