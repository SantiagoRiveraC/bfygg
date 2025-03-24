"use client";
import React, { useState } from "react";
import LoginForm from "@/components/login-form";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isLoading, setIsLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      login(formData); // Asegurar que login termine antes de continuar
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formData={formData}
      handleChange={handleChange}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
}
