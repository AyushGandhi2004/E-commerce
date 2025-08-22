const mongoose = require('mongoose');

const adminCheck = (req, res, next) => {
    const user = req.userInfo;
    if(!user || user.role !== 'admin'){
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed to the next middleware or route handler

};

module.exports = adminCheck;