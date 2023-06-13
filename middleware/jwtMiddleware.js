import jwt  from "jsonwebtoken";
// const { HRMS_JWT_SECRECT } = require("../Utils/config");

// module.exports.verifyUserJwtToken = (req, res, next) => {
//     var token;
//     if ('authorization' in req.headers) {
//         const { authorization } = req.headers;
//         token = authorization;
//     }

//     if (!token)
//         return res.status(403).send({ status: "error", message: 'No token provided.' });
//     else {
//         jwt.verify(token, HRMS_JWT_SECRECT,
//             (err, decoded) => {
//                 if (err)
//                     return res.status(403).send({ status: "error", message: 'Token authentication failed.', });
//                 else {
//                     req.tokenUser = decoded;
//                     next();
//                 }
//             }
//         )
//     }
// }


const decodeKey = (key) => {
    return new Promise((resolve, reject) => {
      jwt.verify(key, process.env.SECRET_KEY, (err, decoded) => {
        if (err || !decoded) return reject(false);
  
        resolve(decoded);
      });
    });
  };
  
  export function validateAuthKey(req, res, next) {
    try {
      const bearerHeader = req.headers["authorization"];
      const authToken = bearerHeader.split(" ");
      if (!bearerHeader || authToken.length !== 2 || authToken[0] !== "Bearer")
        return res.status(401).json({ error: "Invalid auth key " });
      const authKey = authToken[1];
      if (!authKey) return res.status(401).json({ error: "No auth key " });
      decodeKey(authKey)
        .then((decoded) => {
          if (!decoded || !decoded.id)
            return res.status(401).json({ error: "Invalid auth key " });
          req.user = decoded;
          next();
        })
        .catch((err) => {
          res.json({ error: "Invalid auth key " });
        });
    } catch (error) {
      return res.json({ error: "Invalid auth key " });
    }
  }
  
  export function validateAdmin(req, res, next) {
    try {
      const bearerHeader = req.headers["authorization"];
      const authToken = bearerHeader.split(" ");
      if (!bearerHeader || authToken.length !== 2 || authToken[0] !== "Bearer")
        return res.status(401).json({ error: "Invalid auth key " });
      const authKey = authToken[1];
      if (!authKey) return res.status(401).json({ error: "No auth key " });
      decodeKey(authKey)
        .then((decoded) => {
          if (!decoded || !decoded.id)
            return res.status(401).json({ error: "Invalid auth key " });
          if (!decoded.is_hrms) {
            return res
              .status(401)
              .json({ error: "NOT AUTHORIZED IN THIS ROUTE" });
          }
          req.user = decoded;
          next();
        })
        .catch((err) => {
          res.status(401).json({ error: "Invalid auth key" });
        });
    } catch (e) {
      console.error(e);
      return res.status(401).json({ error: "Invalid auth key" });
    }
  }
