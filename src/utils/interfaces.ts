import { Mongoose, Types } from "mongoose";
import LoginForm from '../components/login-form/index';

export interface MongooseConnection {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}


export interface User {
	// BASIC DATA
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	birthday: string;
	role: 'member' | 'affiliate' | 'admin';
	createdAt: Date;
	updatedAt: Date;

	// MEMBER DATA
	membership?: {
		level: 'basic' | 'premium' | 'vip';
		subscriptionExpiration: Date;
		status: boolean;
		loyaltyPoints: number;
		vacationVouchers?: Array<{
			voucherId: Types.ObjectId;
			expirationDate?: Date;
			isActive: boolean;
		}>;
	};

	// AFFILIATE DATA
	affiliate?: {
		referralCode: string;
		referredBy?: Types.ObjectId;
		commissionRate: number;
		earnings?: {
			total: number;
			paid: number;
			pending: number;
		};
	};
}


export interface LoginForm {
	email: string
	password: string
}

export interface ILoginForm {
	// isLoading: boolean;
	showPassword: boolean;
	setShowPassword: (value: boolean) => void;
	formData: {
		email: string;
		password: string;
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


export interface UserEditFormData {
	// Basic info
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	birthday: string;
	role: 'member' | 'affiliate' | 'admin';

	// Membership
	membershipLevel: 'basic' | 'premium' | 'vip';
	subscriptionExpiration: string; 
	subscriptionStatus: boolean;
	loyaltyPoints: number;

	// Affiliate
	referralCode: string;
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
