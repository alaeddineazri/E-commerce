// token middleware
// import expressJwt to verify token authorization
const expressJwt = require("express-jwt");

// tokenMiddleware
const tokenMiddleware = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});
module.exports = {tokenMiddleware }