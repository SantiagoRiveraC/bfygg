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

export interface UserContextType {
  user: User | null;
  login: (formData: { email: string, password: string, rememberMe: boolean }) => Promise<void>;
  isLoading: boolean;
  logout: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const storedUser = decodeJWT(token);

    if (storedUser) {
      const { id } = storedUser;

      try {
        const headers = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(`/api/user/${id}`, headers);
        const { user } = res.data;
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
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
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}
