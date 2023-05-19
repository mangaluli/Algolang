const Tag = require("../models/Tag");

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();

    await res.status(200).send(tags);
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

exports.getTag = async (req, res) => {
  try {
    const tag_id = req.params.tag_id;

    const post = await Tag.findById(tag_id);

    if (!post) {
      await res.status(404).send({ message: "No post found!" });
    }

    await res.status(200).send(post);
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

exports.addTag = async (req, res) => {
  try {
    console.log(req.body);

    const tag = req.body;

    if (!tag) {
      await res.status(400).send({ message: "Wrong Body!" });
    }

    // to be implemented
    const validation_error = false;

    if (validation_error) {
      await res.status(400).send({ message: "Wrong Body!" });
    }

    const tag_overlap = await Tag.findOne({ value: tag.value });

    if (tag_overlap) {
      return res
        .status(409)
        .send({ message: `[${tag.value}] already exists!` });
    }

    await Tag.create(tag);

    await res.status(201).send({ message: "Tag created successfully!" });
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};
