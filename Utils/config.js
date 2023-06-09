const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    MDB_URL: process.env.MDB_URL,
    HRMS_JWT_SECRECT: process.env.HRMS_JWT_SECRECT,
    FIREBASE_AUTH_KEY: process.env.FIREBASE_AUTH_KEY,
    PORT: process.env.PORT,
};
