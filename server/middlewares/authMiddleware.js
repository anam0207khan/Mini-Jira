const jwt = require("jsonwebtoken");

const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
    const unauthorizedReponse = {
        success: false,
        message: "Unauthorized"
    };

    try {
        const auth = req.headers.authorization;
        
        if (!auth) {
            return res.status(401).json(unauthorizedReponse);
        }

        const token = auth.split(' ')[1];
        if (!token) {
            return res.status(401).json(unauthorizedReponse);
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        const tokenData = jwt.decode(token);
        const tokenExpiry = tokenData.exp;
        const now = Date.now();

        if (tokenExpiry <= now) {
            return res.status(401).json(unauthorizedReponse);
        }
        
        const user = await User.findById(tokenData.userId);
        
        if (!user) {
            return res.status(401).json(unauthorizedReponse);
        }

        if (token !== user.token) {
            return res.status(401).json(unauthorizedReponse);
        }

        req.user = user;
        // req.user = await User.findById(decoded.userId);

        next();
    } catch (err) {
        console.log(err)
        res.status(401).json(unauthorizedReponse);
    }
};

module.exports = authMiddleware;