const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if(token){

        token = token.replace(/^Bearer\s+/,"");
        
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                return res.json({message: 'Invalid token'});
            } else {
                req.decoded = decoded;
                return next();
            }
        })
    } else {
        return res.json({
            message: "The token was not provided"
        })
    }
}

module.exports = verifyToken;