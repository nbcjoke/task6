import api from "../api/config";

interface LoginResponse {
  id: string;
}

export class AuthService {
  static async auth(name: string): Promise<LoginResponse> {
    return api
      .post("/auth", { name })
      .then(({ data: { _id } }) => ({ id: _id }));
  }
}
