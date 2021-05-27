const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if(token){

        token = token.replace(/^Bearer\s+/,"");
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
            return next()
        }catch(error){
            return res.status(401).json({message: 'Invalid Token'});
        }
    } else {
        return res.status(401).json({
            message: "The token was not provided"
        })
    }
}

module.exports = verifyToken;