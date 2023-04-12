const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const base64ImageRegex = /^data:image\/[a-zA-Z0-9.+;=-]+\/;base64,[a-zA-Z0-9+/]+\={0,2}$/;

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  image: Joi.string().regex(base64ImageRegex),
});

const reportSchema = Joi.object({
  what: Joi.string().valid(['Offensive name', 'Offensive email', 'Offensive image']).required(),
  description: Joi.string().required(),
})


exports.getUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id).select('-status -status_duration -status_description -password');
    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
}


exports.updateUser = async (req, res) => {
  try {
    const user_is_owner = req.params.user_id === req.user._id;
    if (!user_is_owner) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    const validation_error = loginSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Invalid body');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }


    const token = signUser(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user_is_owner = user_id === req.user._id;
    if (!user_is_owner) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(401).send({ message: "No User Found!" });
    }

    const user_is_owner_or_admin = userIsOwnerOrAdmin(req.user, user);
    if (!user_is_owner_or_admin) {
      return res.status(401).send({ message: "Unathorized!" });
    }

    await user.delete()
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};

exports.reportUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const validation_error = reportSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Invalid body');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    // const userReport = await User.findById(user_id);
    // if (userReport) {
    //   userReport.
    // }

    const token = signUser(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};
