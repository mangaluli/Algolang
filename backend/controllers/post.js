const Post = require("../models/Post");
const PostDelta = require("../models/PostDelta");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .populate("tags");
    await res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const post = await Post.findById(post_id)
      .populate("author", "username")
      .populate("tags")
      .populate("post_delta");

    if (!post) {
      await res.status(404).send({ message: "No post found!" });
    }

    await res.status(200).send(post);
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { post } = req.body;
    console.log(post.post_delta);
    if (!post) {
      await res.status(400).send({ message: "Wrong Body!" });
    }

    // to be implemented
    const validation_error = false;

    if (validation_error) {
      await res.status(400).send({ message: "Wrong Body!" });
    }

    const new_post_delta = new PostDelta(post.post_delta);
    console.log(new_post_delta);
    await Post.create({ ...post, post_delta: new_post_delta._id });
    await new_post_delta.save();

    await res.status(201).send({ message: "Post created successfully!" });
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

const a = {
  post: {
    author: "64613bece19ad9c09e552210",
    date: "1684249028724",
    tags: [
      "6464fc20f9134849fd81b076",
      "64650a60f9134849fd81b07d",
      "64650aa37fcf2dde80f35e1e",
      "64650aac7fcf2dde80f35e21",
    ],

    title: "Edge collision detection",
    url: "//jsfiddle.net/mangaluli/n37c0pzh/",

    likeds: ["64613bece19ad9c09e552210"],
    comment_ids: [],
    post_delta: {
      ops: [
        {
          insert: "WOW A FREAKING BOUNCING BALL! WHO WOULD'VE THOUGHT?",
          _id: {
            $oid: "64657131464a7c80aa192b79",
          },
        },
        {
          insert: "\n",
          attributes: {
            header: 1,
          },
          _id: {
            $oid: "64657131464a7c80aa192b7a",
          },
        },
        {
          insert:
            "Prepare to have your mind blown. Yes, you read it right. A BOUNCING BALL. We've officially reached the pinnacle of human achievement, folks. Move over, sliced bread.\nNow, you might be sitting there, jaw dropped, eyes wide, thinking, 'How? How did they manage to make a ball bounce on a webpage? Are they wizards?' Well, let me lift the veil off this spellbinding spectacle.\nIt's actually quite simple, once you understand the basics of ball bouncing. You see, we've all been overthinking it. All you need to know is when the ball is at X=0, or as us wizards call it, 'the very left side', we just give that ball a nudge to the right. In technical terms, we set xd (that's X Delta for you laypeople) to +1.\nBut what about when our adventurous ball decides to wander off the right side of the screen, you ask? Well, we don't like rule-breakers here, so when X is more than the width of the screen plus the radius of our rebellious little ball (width+r), we set xd to -1, sending it back from whence it came.\nAnd the same goes for y, our vertical explorer. Too high or too low, and we give it a little push in the opposite direction.\nSo there you have it, folks. The mystifying bouncing ball demystified. No magic, just a little bit of logic, a dash of geometry, and a whole lot of spare time.\nRemember, with great power comes great responsibility. Use this bouncing ball wisdom wisely, and only for good. Or, you know, to amuse yourself when you're bored. Either way, have fun!",
          _id: {
            $oid: "64657131464a7c80aa192b7b",
          },
        },
      ],
    },
    __v: 0,
  },
};
