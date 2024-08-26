import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createUser({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.loginAccount(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createUser :: error : ", error);
    }
  }

  async loginUser({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.log("Appwrite service :: loginUser :: error : ", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error : ", error);
    }
    return null;
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logoutUser :: error : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
