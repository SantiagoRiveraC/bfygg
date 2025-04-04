import mongoose, { Schema, Document, Types } from 'mongoose';

interface User extends Document {
	// BASIC USER DATA 
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	birthday: string;
	role: 'member' | 'affiliate' | 'admin';
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
	};
}

const UserSchema = new Schema<User>(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true},
		birthday: { type: String, required: true },
		role: { 
			type: String, 
			enum: ['member', 'affiliate', 'admin'], 
			default: 'member' 
		},

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
			}
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;