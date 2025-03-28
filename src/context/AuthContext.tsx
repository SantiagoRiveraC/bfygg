/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import User from "@/models/User";
import { decodeJWT } from "@/utils/decodeJWT";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUsers } from "./usersContext";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { error } from "console";

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
  const { handleGetAllUsers } = useUsers()
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

  const login =  async (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {

    const promise = axios.post("/api/login", formData)
    toast.promise(
      promise,
      {
        loading: 'logging in...',
        success: (res: AxiosResponse) => {
          localStorage.setItem("token", res.data.token);
          handleGetAllUsers()
          window.location.replace('/admin')
          // router.push('/admin')
          return <>{ res.data.message}</>
        },
        error: (error: AxiosError<{ message?: string }>) => {
          return <>{ error.response?.data.message}</>
        }
      }
    )
  }

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    router.push("/");
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
