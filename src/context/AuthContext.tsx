"use client";

import User from "@/models/User";
import { decodeJWT } from "@/utils/decodeJWT";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useRouter } from "next/navigation";

export interface AuthContextType {
  user: User | null;
  login: (formData: { email: string, password: string, rememberMe: boolean }) => Promise<void>;
  isLoading: boolean;
  logout: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setAuth] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  const fetchAuth = async () => {
    const storedAuth = decodeJWT(token);

    if (storedAuth) {
      const { id } = storedAuth;

      try {
        const headers = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(`/api/user/${id}`, headers);
        const { user } = res.data;
        setAuth(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchAuth();
    }
  }, []);

  const login = async (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      const res = await axios.post("/api/login", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
