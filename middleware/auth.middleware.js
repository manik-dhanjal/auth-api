const jwt = require("jsonwebtoken");



const verifyToken =async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({message:"A token is required for authentication"});
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(403).json({message:"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;