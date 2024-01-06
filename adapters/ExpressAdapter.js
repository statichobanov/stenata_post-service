"use strict";

const express = require("express");
const cors = require("cors");
const PostController = require("../controllers/PostController");

class ExpressAdapter {
  constructor(postInteractor) {
    this.postController = new PostController(postInteractor);
  }

  initConfig(app) {
    const corsOptions = {
      origin: "http://localhost:4200",
      credentials: true,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post(
      "/create-post",
      this.postController.createPost.bind(this.postController)
    );
    app.get(
      "/posts/:postId",
      this.postController.getPostById.bind(this.postController)
    );
    app.put(
      "/posts/:postId",
      this.postController.editPost.bind(this.postController)
    );
    app.delete(
      "/posts/:postId",
      this.postController.deletePost.bind(this.postController)
    );
    app.get(
      "/posts",
      this.postController.getAllPosts.bind(this.postController)
    );
  }
}

module.exports = ExpressAdapter;
