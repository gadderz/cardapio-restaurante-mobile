import { User, UserType } from "../models/User";
import { AuthService } from "../services/AuthService";

export const AuthController = {
  async register(
    name: string,
    email: string,
    password: string,
    type: UserType
  ): Promise<User> {
    return AuthService.register({ name, email, password, type });
  },

  async login(email: string, password: string): Promise<User | null> {
    return AuthService.login(email, password);
  },

  async logout(): Promise<void> {
    await AuthService.logout();
  },

  async getCurrentUser(): Promise<User | null> {
    return AuthService.getCurrentUser();
  },
};