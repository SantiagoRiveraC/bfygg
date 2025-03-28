import mongoose, { Schema, Document } from 'mongoose'

interface User extends Document {
	firstName: string
	lastName: string
	email: string
	password: string
	birthday: string
	role: 'member' | 'affiliate' | 'admin'
	membershipLevel?: 'basic' | 'premium' | 'vip'
	loyaltyPoints?: number
	referralCode?: string
	referredBy?: mongoose.Types.ObjectId
	subscriptionExpiration?: Date,
	subscriptionStatus: boolean,
	createAt: Date,
	updateAt: Date
}



const UserSchema = new Schema<User>(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		birthday: { type: String, required: true }, 
		role: { type: String, enum: ['member', 'affiliate', 'admin'], default: 'member' },
		membershipLevel: { type: String, enum: ['basic', 'premium', 'vip'] },
		loyaltyPoints: { type: Number, default: 0 },
		referralCode: { type: String, unique: true, sparse: true },
		referredBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
		subscriptionExpiration: { type: Date },
		subscriptionStatus: { type: Boolean, default: true}
	}, {
		timestamps: true,
		versionKey: false
	}
)
	
const User = mongoose.models.User || mongoose.model<User>('User', UserSchema)

export default User
