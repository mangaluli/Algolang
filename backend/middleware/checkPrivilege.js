exports.isLoggedIn = (required_privilege) => {
  return (req, res, next) => {
    try {
      const user = req.session.user;

      const privilege_levels = ["user", "mod", "admin", "owner"];
      const user_privilege = privilege_levels.indexOf(user.privilege);
      const required_privilege = privilege_levels.indexOf(required_privilege);

      if (user_privilege < required_privilege) {
        return res.status(403).send({ message: "Insufficient Privilege!" });
      }

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server error" });
    }
  };
};
