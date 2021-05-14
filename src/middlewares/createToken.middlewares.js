const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (payload) => {
    try{
        const token = jwt.sign(payload, process.env.JWT_KEY, {
            algorithm: "HS512",
            expiresIn: "2 days"
        });
        return token;
    } catch(error) {
        return error;
    }
}

module.exports = createToken;