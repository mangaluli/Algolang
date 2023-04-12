const authMiddleware = require('./middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
var morgan = require('morgan')
// const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
// app.use(cors());

const auth = require('./routes/auth');
const post = require('./routes/post');
const comment = require('./routes/comment');
const admin = require('./routes/admin/admin');

app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/comment', comment);
app.use('/api/admin', authMiddleware.userIsAdmin, admin);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connection established. Standing by."))
  .catch(error => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`Port ${PORT} active, Node server standing by.`));