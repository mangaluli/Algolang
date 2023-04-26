const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BannedIp = require("../models/BannedIp");
const BannedEmail = require("../models/BannedEmail");
const VerificationToken = require("../models/VerificationToken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { performance } = require("perf_hooks");

const signUser = (user) => {
  const { _id, privilages } = user;
  return jwt.sign({ _id, privilages }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
  name: joi.string().required().min(2).max(255),
});

const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});

// Login synthetic delay (more info below..)
let last_login_times = Array(20).fill(175);
let avrage_login_time = 173;
let logNewLoginTime = (ms) => {
  last_login_times.push(ms);
  avrage_login_time +=
    (ms - last_login_times.shift()) / last_login_times.length;
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const syntheticDelay = (startTime) =>
  avrage_login_time - (performance.now() - startTime);

exports.register = async (req, res) => {
  try {
    const { name, email } = req.body;

    const validation_error = registerSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send("Invalid body");
    }

    const [email_conflict, email_is_banned, ip_is_banned] = await Promise.all([
      User.findOne({ email }),
      BannedEmail.findOne({ email }),
      BannedIp.findOne({ ip: req.ip }),
    ]);

    if (email_conflict || email_is_banned || ip_is_banned) {
      return res.status(409).send({ message: "Email already in use" });
    }

    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );

    const new_user = await User.create({ name, email, password });

    const token = jwt.sign({ user_id: new_user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await VerificationToken.create({
      user_id: new_user._id,
      token,
    });

    await sendVerificationEmail(email, token);

    res
      .status(201)
      .send({ message: "Registration successful, Please verify email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

// The login function implements an avrage time logger for security purposes.
// On each successfull login, the time it takes for the whole process is stored in an array that is later referenced to calculate the avrage.
// Each unssuccesfull login attempt, where the email is wrong or user is not verified yet, takes less time then an unssuccesfull login attempt with only a wrong password as it doesnt need to uncryptofy it.
// As so I've added a synthetic delay on each login attempt that doesn't have a valid email or the email is unverifeid so the time it takes for all login attempts is similar and can't be exploited for knowing if an email is valid by a simple delay comperison..
// As of now, it is not perfect.. But I didn't want to waste too much time on it.
exports.login = async (req, res) => {
  try {
    const startTime = performance.now();

    const email = req.body.email;

    const validation_error = loginSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send("Invalid body");
    }

    const [email_is_banned, ip_is_banned, user] = await Promise.all([
      BannedEmail.findOne({ email }),
      BannedIp.findOne({ ip: req.ip }),
      User.findOne({ email }),
    ]);

    if (email_is_banned || ip_is_banned) {
      await delay(syntheticDelay(startTime));
      return res.status(409).send({ message: "Email already in use" });
    }

    if (!user) {
      await delay(syntheticDelay(startTime));
      return res.status(401).send({ message: "Invalid email and/or password" });
    }

    const password_correct = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!password_correct) {
      return res.status(401).send({ message: "Invalid email and/or password" });
    }

    const email_is_verified = user.is_verified;
    if (!email_is_verified) {
      return res.status(401).send({ message: "Email not verified" });
    }

    const token = signUser(user);

    logNewLoginTime(performance.now() - startTime);
    console.log(avrage_login_time);
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
