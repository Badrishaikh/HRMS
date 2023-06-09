const jwt = require("jsonwebtoken");
const { HRMS_JWT_SECRECT } = require("../Utils/config");

module.exports.verifyUserJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers) {
        const { authorization } = req.headers;
        token = authorization;
    }

    if (!token)
        return res.status(403).send({ status: "error", message: 'No token provided.' });
    else {
        jwt.verify(token, HRMS_JWT_SECRECT,
            (err, decoded) => {
                if (err)
                    return res.status(403).send({ status: "error", message: 'Token authentication failed.', });
                else {
                    req.tokenUser = decoded;
                    next();
                }
            }
        )
    }
}
