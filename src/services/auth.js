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
      const userAccount = await this.account
        .create(ID.unique(), email, password, name)
        .then(() => {
          console.log("user is created");
          const session = this.loginUser({ email, password });
          console.log(session);
        });
      console.log(userAccount)
      return userAccount;
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
      console.log("user is logged in");
      return session;
    } catch (error) {
      console.log("Appwrite service :: loginUser :: error : ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error : ", error);
    }
    return null;
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
      console.log("user is logged out");
    } catch (error) {
      console.log("Appwrite service :: logoutUser :: error : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
