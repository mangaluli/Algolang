const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id);

    const {
      username,
      follower_user_ids,
      post_ids,
      comment_ids,
      following_user_ids,
      liked_post_ids,
      liked_comment_ids,
    } = user;

    res.status(200).send({
      username,
      follower_user_ids,
      post_ids,
      comment_ids,
      following_user_ids,
      liked_post_ids,
      liked_comment_ids,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
};

exports.reportUser = async (req, res) => {};
