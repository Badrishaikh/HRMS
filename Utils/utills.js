const jwt = require("jsonwebtoken");
exports.checkTokenValue = (req, JWT_SECRECT) => {
  var token;
  if ('authorization' in req.headers) {
    const { authorization } = req.headers;
    token = authorization;
  }

  try {
    if (token) {
      let decoded = jwt.verify(token, JWT_SECRECT);
      // console.log(decoded);
      return decoded;
    }
  } catch (error) {
    console.log("here");
    // console.log(error);
  }
  return {};
}

exports.getAge = (birth) => {
  ageMS = Date.parse(Date()) - Date.parse(birth);
  age = new Date();
  age.setTime(ageMS);
  ageYear = age.getFullYear() - 1970;
  return ageYear;
}

exports.getCurrentDateTimeNumber = () => {
  let dt = new Date();
  return dt.getTime()
}