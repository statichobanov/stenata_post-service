"use strict";

const PostModel = require("../entities/Post");

class PostRepository {
  constructor() {
    this.PostModel = PostModel;
  }

  async createPost(postData) {
    try {
      const newPost = new this.PostModel(postData);
      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const post = await this.PostModel.findOne({ postId });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async editPost(postId, updatedPostData) {
    try {
      const updatedPost = await this.PostModel.findOneAndUpdate(
        { postId },
        updatedPostData,
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await this.PostModel.findOneAndRemove({ postId });
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const posts = await this.PostModel.find();
      return posts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostRepository;
