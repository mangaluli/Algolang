const axios = require("axios");

exports.checkUrl = async (req, res) => {
  try {
    const url = String(req.body.url);

    const regex =
      /^(?:https?:\/\/)?(?:www\.)?jsfiddle\.net\/[a-zA-Z0-9_]+\/[a-z0-9-]+$/i;

    // client side regex validation should fail first, but just in case..
    if (!regex.test(url)) {
      return res.status(400).send({ message: "Invalid URL" });
    }
    const path =
      !url.startsWith("http") && !url.startsWith("https://") ? "//" + url : url;

    const jsfiddle_res = await axios.head("//" + path);
    if (jsfiddle_res.status !== 200)
      return res.status(jsfiddle_res.status).send({ message: "Invalid URL" });

    return res.status(200).send({ message: "Valid URL" });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send({ message: "Invalid URL" });
    }

    res.status(500).send({ message: "Server Error!" });
  }
};
