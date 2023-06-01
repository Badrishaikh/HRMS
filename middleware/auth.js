import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.token;
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, "badri", (err, user) => {
//         if (err) res.status(403).json("Token is not valid!");
//         req.user = user;
//         console.log(req.user)
//         next();
//       });
//     } else {
//       return res.status(401).json("You are not authenticated!");
//     }
//   };
  
//   const verifyTokenAndAuthorization = (req, res, next) => {
//     verifyToken(req, res, () => {
//       if (req.user.id === req.params.id || req.user.isAdmin) {
//         next();
//       } else {
//         res.status(403).json("You are not alowed to do that!");
//       }
//     });
//   };
  
//   const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//       if (req.user.hrms) {
//         console.log(req.user.hrms)
//         next();
//       } else {
//         res.status(403).json(" 456 You are not alowed to do that!");
//       }
//     });
//   };
//export{ verifyToken,verifyTokenAndAdmin};
const decodeKey = (key) => {
    return new Promise((resolve, reject) => {
      jwt.verify(key, "badri", (err, decoded) => {
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
 // export{ verifyToken,verifyTokenAndAdmin};