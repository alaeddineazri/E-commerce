// token middleware
const expressJwt = require('express-jwt')

// tokenMiddleware
const tokenMiddleware = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
module.exports = {tokenMiddleware }