const PostRepository = require("../repostories/PostRepository");

class PostInteractor {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(postData) {
    try {
      const savedPost = await this.postRepository.createPost(postData);
      return savedPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  }

  async getPostById(postId) {
    try {
      const post = await this.postRepository.getPostById(postId);
      if (!post) {
        throw new Error("Post not found.");
      }
      return post;
    } catch (error) {
      console.error("Error getting post by ID:", error);
      throw new Error("Failed to get post by ID.");
    }
  }

  async editPost(postId, updatedPostData) {
    try {
      const updatedPost = await this.postRepository.editPost(
        postId,
        updatedPostData
      );
      if (!updatedPost) {
        throw new Error("Post not found for editing.");
      }
      return updatedPost;
    } catch (error) {
      console.error("Error editing post:", error);
      throw new Error("Failed to edit post.");
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await this.postRepository.deletePost(postId);
      if (!deletedPost) {
        throw new Error("Post not found for deletion.");
      }
      return deletedPost;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post.");
    }
  }

  async getAllPosts() {
    try {
      const posts = await this.postRepository.getAllPosts();
      return posts;
    } catch (error) {
      console.error("Error getting all posts:", error);
      throw new Error("Failed to get all posts.");
    }
  }
}

module.exports = PostInteractor;
