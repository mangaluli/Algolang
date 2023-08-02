const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Report = require("../models/Report");

exports.getReport = async (req, res) => {
  try {
    const session_user = req.session.user;
    if (!session_user) {
      return res
        .status(401)
        .send({ message: "Only Registered Users Have A Profile!" });
    }

    if (session_user.privilige === "user") {
      return res.status(403).send({ message: "Access Denied!" });
    }

    return res.status(200).send({ message: "Report Retrived" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.getReportsPaginated = async (req, res) => {
  try {
    const session_user = req.session.user;
    if (!session_user) {
      return res
        .status(401)
        .send({ message: "Only Registered Users Have A Profile!" });
    }

    if (session_user.privilige === "user") {
      return res.status(403).send({ message: "Access Denied!" });
    }

    return res.status(200).send({ message: "Report Retrived" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const session_user = req.session.user;
    if (!session_user) {
      return res
        .status(401)
        .send({ message: "Only Registered Users Have A Profile!" });
    }

    if (session_user.privilige === "user") {
      return res.status(403).send({ message: "Access Denied!" });
    }

    return res.status(200).send({ message: "Report Retrived" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const session_user = req.session.user;
    if (!session_user) {
      return res
        .status(401)
        .send({ message: "Only Registered Users Have A Profile!" });
    }

    if (session_user.privilige === "user") {
      return res.status(403).send({ message: "Access Denied!" });
    }

    return res.status(200).send({ message: "Report Retrived" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};
