const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
var morgan = require("morgan");
// const cors = require('cors');

const User = require("./models/User");

app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

const auth = require("./routes/auth");
const post = require("./routes/post");
const comment = require("./routes/comment");
// const report = require('./routes/report');
const verification = require("./routes/verification");
// const admin = require('./routes/admin');

app.get("/get/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
});

app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/comment", comment);
// app.use('/api/report', report);
app.use("/verify-email", verification);
// app.use('/api/admin', authMiddleware.userIsAdmin, admin);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connection established. Standing by."))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () =>
  console.log(`Port ${PORT} active, Node server standing by.`)
);
