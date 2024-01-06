"use strict";

class PostController {
  constructor(postInteractor) {
    this.postInteractor = postInteractor;
  }

  async createPost(req, res) {
    try {
      const postData = req.body;
      const savedPost = await this.postInteractor.createPost(postData);
      res.status(201).json(savedPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post." });
    }
  }

  async getPostById(req, res) {
    try {
      const postId = req.params.postId;
      const post = await this.postInteractor.getPostById(postId);
      res.status(200).json(post);
    } catch (error) {
      console.error("Error getting post by ID:", error);
      res.status(500).json({ message: "Failed to get post by ID." });
    }
  }

  async editPost(req, res) {
    try {
      const postId = req.params.postId;
      const updatedPostData = req.body;
      const updatedPost = await this.postInteractor.editPost(
        postId,
        updatedPostData
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error editing post:", error);
      res.status(500).json({ message: "Failed to edit post." });
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.postId;
      const deletedPost = await this.postInteractor.deletePost(postId);
      res.status(200).json(deletedPost);
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post." });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await this.postInteractor.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error getting all posts:", error);
      res.status(500).json({ message: "Failed to get all posts." });
    }
  }
}

module.exports = PostController;
