const logger = require('./middleware/logger');
const mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.PORT;
require('dotenv').config();
const app = express();
// const cors = require('cors');


app.use(express.json());
app.use(logger);
// app.use(cors());

const auth = require('./routes/auth');
const post = require('./routes/post');
const comment = require('./routes/comment');

app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/comment', comment);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connection established. Standing by."))
  .catch(error => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`Port ${PORT} active, Node server standing by.`));