import mongoose, { Schema, Document, Types } from 'mongoose';

interface User extends Document {
	// BASIC USER DATA 
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	birthday: string;
	role: 'member' | 'affiliate' | 'admin';
	photo: string;
	createdAt: Date;
	updatedAt: Date;

	// MEMBERS DATA
	membership?: {
		level: 'basic' | 'premium' | 'vip';
		subscriptionExpiration: Date;
		status: boolean;
		loyaltyPoints: number;
		vacationVouchers?: Array<{
			voucherId: Types.ObjectId;
			expirationDate: Date;
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
		status: 'pending' | 'approved' | 'rejected';
		companyName?: string;
		contactName?: string;
		phone?: string;
		address?: string;
		affiliateType?: string;
	};
}

const UserSchema = new Schema<User>(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		birthday: { type: String, required: true },
		role: {
			type: String,
			enum: ['member', 'affiliate', 'admin'],
			default: 'member'
		},
		photo: { type: String },

		// MEMBERS STRUCTURE
		membership: {
			level: {
				type: String,
				enum: ['basic', 'premium', 'vip'],
				default: 'basic'
			},
			subscriptionExpiration: { type: Date },
			status: {
				type: Boolean,
				default: true
			},
			loyaltyPoints: {
				type: Number,
				default: 0
			},
			vacationVouchers: [{
				voucherId: {
					type: Schema.Types.ObjectId,
					ref: 'Voucher',
					required: true
				},
				expirationDate: { type: Date },
				isActive: { type: Boolean, default: true }
			}]
		},

		// AFFILIATE STRUCTURE
		affiliate: {
			referralCode: {
				type: String,
				unique: true,
				sparse: true
			},
			referredBy: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			commissionRate: {
				type: Number,
				default: 0.1
			},
			earnings: {
				total: { type: Number, default: 0 },
				paid: { type: Number, default: 0 },
				pending: { type: Number, default: 0 }
			},
			status: {
				type: String,
				enum: ['pending', 'approved', 'rejected'],
				default: 'pending'
			},
			companyName: { type: String },
			contactName: { type: String },
			phone: { type: String },
			address: { type: String },
			affiliateType: { type: String }
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;