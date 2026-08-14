const jwt = require('jsonwebtoken');
const secretKey = 'glowlistrahasia';

const authJWT = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).json({ message: 'Silakan login terlebih dahulu' });
    }

    const token = tokenHeader.startsWith('Bearer ') 
        ? tokenHeader.split(' ')[1] 
        : tokenHeader;

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid' });
        }
        req.user = user;
        next();
    });
};

module.exports = authJWT;