
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
