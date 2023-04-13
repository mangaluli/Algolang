const User = require('../models/User');
const { UserReport } = require('../models/Report');
const { reportSchema } = require('../utils/JoiReportSchema');

exports.getUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id).select('-status -status_duration -status_description -password');
    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    const res_user = {}

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
}

exports.reportUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const client_user_id = req.user._id;

    const validation_error = reportSchema.validate(req.body).error;
    if (validation_error) {
      return res.status(400).send('Invalid body');
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "No user found" });
    }

    const report = await UserReport.findOne({ entity_type: 'user', entity_id: user_id, reporter_id: client_user_id });
    if (report) {
      if (req.body.overwrite) {
        delete req.body.overwrite;
        Object.assign(report, req.body);
        await report.save();
        return res.status(200).send("Reported");
      }
      return res.status(409).send({ message: "Already reported", report });
    }

    delete req.body.overwrite;

    await UserReport.create(req.body);
    res.status(201).send("Reported")
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};
