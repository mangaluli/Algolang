const axios = require("axios");

exports.testUrl = async (req, res) => {
  try {
    const { slug } = req.params;

    const regex = /^[a-z0-9-]+$/;

    // client side regex validation should fail first, but just in case..
    if (!regex.test(slug)) {
      return res.status(400).send({ message: "Invalid SLUG" });
    }

    const path = `https://codesandbox.io/s/${slug}`;

    try {
      const codesandbox_res = await axios.get(path);
      if (codesandbox_res.status !== 200)
        return res
          .status(codesandbox_res.status)
          .send({ message: "Invalid URL" });
    } catch (error) {
      return res.status(404).send({ message: "Invalid Url" });
    }

    return res.status(200).send({ message: "Valid URL" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};
