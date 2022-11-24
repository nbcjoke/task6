import api from "../api/config";

export class MessageService {
  static async sendMessage(from: string, to: string, message: object) {
    return api.post("/message", { from, to, message });
  }

  static async getMessages() {
    return api.get("/messages");
  }
}
