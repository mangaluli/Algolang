const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Joi = require("joi");
const { deltaSchema } = require("../utils/JoiDeltaSchema");
Joi.objectId = require("joi-objectid")(Joi);

const commentSchema = Joi.object({
  parent_type: Joi.string().valid("post", "comment").required(),
  parent_id: Joi.string().required(),
  author_id: Joi.objectId().required(),
  author_name: Joi.string().required(),
  date: Joi.date().default(Date.now()).required(),
  delta: deltaSchema.required(),
  like_user_ids: Joi.array().items(Joi.objectId()).default([]),
  comment_ids: Joi.array().items(Joi.objectId()).default([]),
});

exports.addReply = async (req, res) => {};

exports.addComment = async (req, res) => {};

exports.likeComment = async (req, res) => {};

exports.editComment = async (req, res) => {};

exports.deleteComment = async (req, res) => {};

exports.getComment = async (req, res) => {};

exports.updateComment = async (req, res) => {};
