const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const signToken = (data) => {
  return jwt.sign(data, secretKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  signToken,
  verifyToken,
};
