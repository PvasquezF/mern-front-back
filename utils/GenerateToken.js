const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.jwt_secret);
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = generateToken;
