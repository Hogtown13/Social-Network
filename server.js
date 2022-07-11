const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const { Users, Thoughts} = require('./models');

app.use(require('./routes'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));


app.listen(PORT, () => console.log(`APP now listening on localhost:${PORT}`))