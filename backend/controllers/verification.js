const VerificationToken = require("../models/VerificationToken");
const { sendVerificationEmail } = require("../utils/sendVerificationEmail");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.verifyUser = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      console.log("BBB");
      return res
        .status(400)
        .send({ message: "Invalid or expired verification link" });
    }

    const verificationToken = await VerificationToken.findOne({ token });

    if (!verificationToken) {
      return res
        .status(400)
        .send({ message: "Invalid or expired verification link." });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Invalid or expired verification link." });
    }

    const user = await User.findById(verificationToken.user_id);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid or expired verification link." });
    }

    if (user.is_verified) {
      return res
        .status(200)
        .send({ message: "Invalid or expired verification link." });
    }

    user.is_verified = true;
    await user.save();

    await VerificationToken.findByIdAndDelete(verificationToken._id);

    res.status(200).send({ message: "User Verified!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
};

exports.sendVerificationEmail = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found!" });
    }
    if (user.is_verified) {
      return res.status(200).send("Your email is already verified.");
    }

    const user_id = user._id;

    await VerificationToken.findOneAndDelete({ user_id });

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await VerificationToken.create({ user_id, token });

    await sendVerificationEmail(email, token);

    res.status(200).send({ message: "Verification email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
};
