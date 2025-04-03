"use client";
import React, { useState } from "react";
import LoginForm from "@/components/login-form";
import { Toaster } from "react-hot-toast";
import { useUsers } from "@/context/usersContext";




export default function LoginPage() {

	const [showPassword, setShowPassword] = useState(false);
	const { handleLogin } = useUsers()


	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
		handleLogin(formData)
	};

return (
	<>
		<LoginForm
			handleSubmit={handleSubmit}
			// isLoading={isLoading}
			showPassword={showPassword}
			setShowPassword={setShowPassword}
			formData={formData}
			handleChange={handleChange}
			handleCheckboxChange={handleCheckboxChange}
		/>
		<Toaster />
	</>
);
}
