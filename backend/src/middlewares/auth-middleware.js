
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //if token stored in local storage then:
    //const authHeader = req.headers['authorization'];
    //const token = authHeader &&  authHeader.split(' ')[1];

    //if token stored in cookie :
    const token = req.cookies.accessToken;
    //If token is not present return error:
    if(!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }
    //Verify the token:
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded User Info from token:", decodedUser);
        req.userInfo = decodedUser; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(`Invalid Token Or session expired: ${error}`);
        return res.status(403).json({ message: 'Invalid token or session expired' });
    }

};

module.exports = authMiddleware;