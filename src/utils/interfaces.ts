import { Mongoose } from "mongoose";

export interface MongooseConnection {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

export interface User {
	_id: string
	firstName: string
	lastName: string
	email: string
	password: string
	birthday: string
	role: string
	membershipLevel: string
	loyaltyPoints: number
	referralCode: string
	referredBy: string
	subscriptionExpiration: Date
	subscriptionStatus: boolean
	createAt: Date
	updateAt: Date
}

export interface ILoginForm {
	// isLoading: boolean;
	showPassword: boolean;
	setShowPassword: (value: boolean) => void;
	formData: {
		email: string;
		password: string;
		rememberMe: boolean;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckboxChange: (checked: boolean) => void;
	handleSubmit: (e: React.FormEvent) => void;
}

export interface ISignUpForm {
	errors: FormErrors;
	handleSubmit: (e: React.FormEvent) => void;
	formData: FormData;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckboxChange: (checked: boolean) => void;
	isLoading: boolean;
	showPassword: boolean;
	setShowPassword: (value: boolean) => void;
	showConfirmPassword: boolean;
	setShowConfirmPassword: (value: boolean) => void;
	passwordStrength: number;
	getStrengthColor: () => string;
	getStrengthText: () => string;
}

export type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	birthday: string;
};

export type FormErrors = {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	acceptTerms?: string;
	general?: string;
};

export interface RouteContext {
	params: Promise<{ id: string }>;	
}
