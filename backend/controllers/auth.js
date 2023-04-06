const jwt = require('jsonwebtoken');
const User = require('../models/User');
const joi = require('joi');
const bcrypt = require('bcrypt');


const signUser = (user) => {
  const { _id, email, is_admin } = user;
  jwt.sign({ _id, email, is_admin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
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



exports.register = async (req, res) => {
  try {
    const validation_error = registerSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Wrong body');
    }

    const email_conflict = await User.findOne({ email: req.body.email });
    if (email_conflict) {
      return res.status(409).send('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const new_user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
      is_admin: false,
    });
    await new_user.save();

    const token = signUser(new_user);
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const validation_error = loginSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Wrong body');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }
    const password_correct = await bcrypt.compare(req.body.password, user.password);
    if (!password_correct) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    const token = signUser(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};