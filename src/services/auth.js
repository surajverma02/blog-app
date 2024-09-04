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
      var userAccount;
      await this.account.create(ID.unique(), email, password, name).then(
        (response) => {
          console.log("user is created");
          userAccount = response;
        },
        (error) => {
          console.log(error);
          throw new Error("User not created, try again!");
        }
      );
      return userAccount;
    } catch (error) {
      console.log("Appwrite service :: createUser :: error : ", error);
    }
  }

  async loginUser({ email, password }) {
    try {
      var session;
      await this.account.createEmailPasswordSession(email, password).then(
        (response) => {
          console.log("user is logged in");
          session = response;
        },
        (error) => {
          console.log(error);
          throw new Error("User does not logged in, try again!");
        }
      );
      return session;
    } catch (error) {
      console.log("Appwrite service :: loginUser :: error : ", error);
    }
  }

  async getCurrentUser() {
    try {
      var userData;
      await this.account.get().then((user) => {
        console.log(user);
        console.log("User data retrieved.");
        userData = user;
      },
      (error) => {
        console.log(error)
        throw new Error("User data not gets, try again!");   
      });
      return userData;
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
