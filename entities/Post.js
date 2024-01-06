"use strict";

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  author: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  hashtags: { type: [String], default: undefined },
  mentions: { type: [String], default: undefined },
  imageUrl: { type: String, default: undefined },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
