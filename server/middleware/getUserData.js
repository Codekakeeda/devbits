const jwt = require('jsonwebtoken');

const getUserData = (req, res, next) => {

    try {
        const token = req.header('authtoken');
        const data = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        req.user = data.user;

        next();

        if (!token) {
            return res.status(401).send({ error: "Authentication Denied" });
        }

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = getUserData;