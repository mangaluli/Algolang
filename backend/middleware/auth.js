const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWTKEY);
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findById(payload._id);
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" });
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) next();
  else next("route");
};
