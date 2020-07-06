const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please add a url"],
  },

  customUrl: {
    type: String,
    required: [true, "Please add your custom url"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Url", UrlSchema);
