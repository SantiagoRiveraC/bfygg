import mongoose, { Schema, Document, Model } from 'mongoose';

interface Subscription extends Document {
  name: string;
  description: string;
  price: number;
  currency: 'USD' | 'COP' | 'EUR';
  billingCycle: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  benefits: string[];
}

const currencyEnum = ['USD', 'COP', 'EUR'] as const;
const billingCycleEnum = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;

const SubscriptionSchema = new Schema<Subscription>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: currencyEnum, required: true, default: 'USD' },
    billingCycle: { type: String, enum: billingCycleEnum, required: true, default: 'Monthly' },
    benefits: { type: [String], required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SubscriptionModel: Model<Subscription> = mongoose.model<Subscription>('Subscription', SubscriptionSchema);

export default SubscriptionModel;
