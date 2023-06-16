const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const session_user = req.session.user;
    if (!session_user) {
      return res
        .status(401)
        .send({ message: "Only Registered Users Have A Profile!" });
    }

    const user = await User.aggregate([
      { $match: { _id: new ObjectId(session_user._id) } },
      {
        $addFields: {
          post_count: { $size: "$posts" },
          comment_count: { $size: "$comments" },
          liked_post_count: { $size: "$liked_posts" },
          liked_comment_count: { $size: "$liked_comments" },
        },
      },
      {
        $project: {
          password: 0,
          posts: 0,
          comments: 0,
          liked_posts: 0,
          liked_comments: 0,
        },
      },
    ]);

    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    await res.status(200).send(user[0]);
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};
