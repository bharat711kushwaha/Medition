
const mongoose = require('mongoose');

const meditationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Meditation = mongoose.model('Meditation', meditationSchema);

module.exports = Meditation;
