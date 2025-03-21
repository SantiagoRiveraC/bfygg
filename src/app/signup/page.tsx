"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/signup-form";
import { FormData, FormErrors } from "@/utils/interfaces";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }

    // Check password match when confirm password changes
    if (name === "confirmPassword" && formData.password !== value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value ? "Passwords don't match" : undefined,
      }));
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
    if (errors.acceptTerms) {
      setErrors((prev) => ({ ...prev, acceptTerms: undefined }));
    }
  };

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle successful signup
      router.push("/login?signup=success");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({
        general: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupForm
      errors={errors}
      handleSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      handleCheckboxChange={handleCheckboxChange}
      isLoading={isLoading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      passwordStrength={passwordStrength}
      getStrengthColor={getStrengthColor}
      getStrengthText={getStrengthText}
    />
  );
}
