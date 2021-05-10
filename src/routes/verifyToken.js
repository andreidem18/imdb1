const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];

    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                return res.json({message: 'Invalid token'});
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            message: "The token was not provided"
        })
    }
}

module.exports = verifyToken;