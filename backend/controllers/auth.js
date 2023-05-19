const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const { sendVerificationEmail } = require("../utils/sendVerificationEmail");
const joi = require("joi");
const bcrypt = require("bcrypt");

const registerSchema = joi.object({
  username: joi.string().required().min(2).max(255),
  email: joi.string().required().email().min(5),
  password: joi.string().required().min(8),
});

const loginSchema = joi.object({
  email: joi.string().required().email().min(5),
  password: joi.string().required().min(8),
});

exports.register = async (req, res) => {
  try {
    const { username, email } = req.body;

    const validation_error = registerSchema.validate(req.body).error;
    if (validation_error) {
      console.log("invalid body: " + req.body);
      return res.status(400).send("Invalid body");
    }

    const email_conflict = await User.findOne({ email });

    if (email_conflict) {
      return res.status(409).send({ message: "Email already in use" });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const new_user = await User.create({ username, email, password });

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

exports.login = async (req, res) => {
  try {
    const email = req.body.email;

    const validation_error = loginSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send("Invalid body");
    }

    const user = await User.findOne({ email });

    if (!user) {
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

    const { _id, username, privilege } = user;

    req.session.regenerate(async function (error) {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error" });
      }

      req.session.user = { _id, username, privilege };
      await req.session.save();

      res.status(200).send({ message: "Login successful" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

exports.session = async (req, res) => {
  try {
    console.log("user: ", req.session.user);

    if (!req.session.user) {
      res.status(400);
    }

    res.status(200).send({ user: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
