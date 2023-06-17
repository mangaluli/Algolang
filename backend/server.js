const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
var morgan = require("morgan");
const cors = require("cors");
var session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connection established. Standing by."))
  .catch((error) => {
    console.log(error);
  });

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const auth = require("./routes/auth");
const user = require("./routes/user");
const verification = require("./routes/verification");
const testUrl = require("./routes/testUrl");
const post = require("./routes/post");
const tag = require("./routes/tag");
const comment = require("./routes/comment");
const profile = require("./routes/profile");

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/verify", verification);
app.use("/api/test-url", testUrl);
app.use("/api/post", post);
app.use("/api/tag", tag);
app.use("/api/comment", comment);
app.use("/api/profile", profile);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () =>
  console.log(`Port ${PORT} active, Node server standing by.`)
);
