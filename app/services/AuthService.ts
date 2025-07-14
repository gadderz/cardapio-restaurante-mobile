import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

const USER_KEY = "@RestaurantApp:Users";
const AUTH_KEY = "@RestaurantApp:Auth";

const AuthService = {
  // Cadastra um novo usuário
  async register(user: Omit<User, "id">): Promise<User> {
    const users = await this.getUsers();
    const newUser = { ...user, id: Date.now().toString() };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify([...users, newUser]));
    return newUser;
  },

  // Faz login
  async login(email: string, password: string): Promise<User | null> {
    const users = await this.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  // Retorna usuário logado
  async getCurrentUser(): Promise<User | null> {
    const userJson = await AsyncStorage.getItem(AUTH_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  // Logout
  async logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_KEY);
  },

  // Lista todos os usuários (para debug)
  async getUsers(): Promise<User[]> {
    const usersJson = await AsyncStorage.getItem(USER_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  },
};

export default AuthService;