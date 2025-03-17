const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    // Firebase UID
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hasAcceptedTerms: {
    type: Boolean,
    required: true,
    default: false,
  },
  displayName: String,
  photoURL: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
