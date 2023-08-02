exports.isLoggedIn = async (req, res, next) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).send({ message: "Not Logged In!" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" });
  }
};
