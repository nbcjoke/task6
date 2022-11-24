import api from "../api/config";

export class UserService {
  static async fetchUsers() {
    return api.get("/users");
  }
}
