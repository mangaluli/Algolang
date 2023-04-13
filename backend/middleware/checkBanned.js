const BannedIp = require('../models/BannedIp');
const BannedEmail = require('../models/BannedEmail');

exports.checkBanned = async (req, res, next) => {
  try {
    const [ip_is_banned, email_is_banned] = await Promise.all([
      BannedIp.findOne({ ip: req.ip }),
      BannedEmail.findOne({ email: req.user.email }),
    ]);

    if (ip_is_banned || email_is_banned) {
      return res.status(403).send({ message: 'You are banned' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" });
  }
};