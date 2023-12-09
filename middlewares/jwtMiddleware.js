const jwt = require("jsonwebtoken");
exports.jwtMiddleware = (req, res, next) => {
 
  const token = req.headers["access_token"].split(" ")[1];
  try {
    const jwtResponse = jwt.verify(token, "secretkey123");
    req.payload = jwtResponse.id;
    next();
  } catch {
    res.status(401).json("autherization failed, please login");
  }
};
