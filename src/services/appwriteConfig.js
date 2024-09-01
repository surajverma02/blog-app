import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

//   Post methods

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: createPost :: error : ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const post = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error : ", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error : ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error : ", error);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      const allPosts = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return allPosts;
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error : ", error);
      return false;
    }
  }

//   File methods

  async uploadFile(file) {
    try {
      const uploadedFile = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error : ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, ID.unique());
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error : ", error);
      return false;
    }
  }

  previewFile() {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, ID.unique());
    } catch (error) {
      console.log("Appwrite service :: previewFile :: error : ", error);
      return false;
    }
  }
}

const services = new Services();
export default services;
