const Post = require("../models/Post");
const PostDelta = require("../models/PostDelta");
const Comment = require("../models/Comment");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const postSchema = Joi.object({
  title: Joi.string().required(),
  author_id: Joi.objectId().required(),
  author_name: Joi.string().required(),
  date: Joi.string().default(String(Date.now())),
  playgroud_url: Joi.string().required(),
  like_user_ids: Joi.array().items(Joi.objectId()),
  comment_ids: Joi.array().items(Joi.objectId()),
  preview_text: Joi.string().optional(),
});

const postDeltaSchema = Joi.object({
  delta: Joi.string().required(),
});

exports.getAllPosts = async (req, res) => {};

exports.getPost = async (req, res) => {};

exports.createPost = async (req, res) => {};

exports.updatePost = async (req, res) => {};

exports.addComment = async (req, res) => {};

exports.likePost = async (req, res) => {};

exports.deletePost = async (req, res) => {};
