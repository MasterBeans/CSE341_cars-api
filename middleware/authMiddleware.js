// const jwt = require('jsonwebtoken');

// exports.authenticate = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

//     try {
//         const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token.' });
//     }
// };


const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the 'Authorization' header
    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

    try {
        // Directly verify the token without splitting
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
