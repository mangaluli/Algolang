const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
var morgan = require("morgan");
const cors = require("cors");
var session = require("express-session");

const User = require("./models/User");
const Post = require("./models/Post");

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const auth = require("./routes/auth");
const user = require("./routes/user");
const verification = require("./routes/verification");
const checkUrl = require("./routes/checkUrl");
const post = require("./routes/post");
const tag = require("./routes/tag");

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/verify", verification);
app.use("/api/check-url", checkUrl);
app.use("/api/post", post);
app.use("/api/tag", tag);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connection established. Standing by."))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () =>
  console.log(`Port ${PORT} active, Node server standing by.`)
);
