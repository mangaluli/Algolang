const jwt = require('jsonwebtoken');
const User = require('../models/User');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { performance } = require('perf_hooks');


const signUser = (user) => {
  const { _id, is_admin } = user;
  return jwt.sign(
    { _id, is_admin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
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
let avg = 173;
let logNewLoginAvrage = (milliseconds) => {
  last_login_times.push(milliseconds);
  avg += (milliseconds - last_login_times.shift()) / last_login_times.length;
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



exports.register = async (req, res) => {
  try {
    const validation_error = registerSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Invalid body');
    }

    const email_conflict = await User.findOne({ email: req.body.email });
    if (email_conflict) {
      return res.status(409).send('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const new_user = User.create({
      name: req.body.name,
      email: req.body.email,
      password
    });

    const token = signUser(new_user);
    res.status(201).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};

// The login function implements an avrage time logger for security purposes.
// On each successfull login, the time it took for the whole process is stored in an array of avrage times.
// Each unssuccesfull login attempt, where the email is wrong, takes less time then an unssuccesfull login attempt with a valid email.
// As so I've added a synthetic delay on each login attempt that doesn't have a valid email so the time it takes for all login attempts is similar and can't be exploited for knowing if an email is valid by a simple delay comperison..
// As of now, it is not perfect.. But I didn't want to waste too much time on it.
exports.login = async (req, res) => {
  try {
    const startTime = performance.now();

    const validation_error = loginSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Invalid body');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const synthetic_delay = avg - (performance.now() - startTime) - 8;
      await delay(synthetic_delay);
      return res.status(401).send({ message: "Incorrect EMAIL or password" });
    }

    const password_correct = await bcrypt.compare(req.body.password, user.password);
    if (!password_correct) {
      return res.status(401).send({ message: "Incorrect email or PASSWORD" });
    }

    const token = signUser(user);

    logNewLoginAvrage(performance.now() - startTime);
    console.log(avg);
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};