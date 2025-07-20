import type React from "react";

export type UserRole = "customer" | "partner" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  available?: boolean;
  verfied?: boolean;
  avatarUrl?: string;
  token?: string;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  inputUser: Partial<IUser> | null;
  setInputUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
  handleLogin: (credentials: Partial<IUser>) => void;
  handleRegister: (credentials: Partial<IUser>) => void;
  handleLogout: () => void;
  handleResetPassword: (email: string) => void;
}
