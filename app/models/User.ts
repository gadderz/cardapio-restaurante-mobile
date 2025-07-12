export type UserType = "client" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}