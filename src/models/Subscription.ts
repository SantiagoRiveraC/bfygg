import mongoose, { Schema, Document, Model } from "mongoose";

const currencyEnum = ["USD", "COP", "EUR"] as const;
const billingCycleEnum = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
const subscriptionTypeEnum = ["simple", "variable", "bundled"] as const;

type Currency = (typeof currencyEnum)[number];
type BillingCycle = (typeof billingCycleEnum)[number];
type SubscriptionType = (typeof subscriptionTypeEnum)[number];

interface SubscriptionOption {
  name: string;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  benefits: string[];
}

export interface Subscription extends Document {
  name: string;
  description: string;
  type: SubscriptionType;
  price?: number; // solo para simple
  currency?: Currency; // solo para simple
  billingCycle?: BillingCycle; // solo para simple
  benefits?: { text: string }[]; // solo para simple
  options?: SubscriptionOption[]; // solo para variable
  bundledItems?: { itemId: string }[]; // solo para bundled (ej: IDs de productos o servicios)
}

const SubscriptionOptionSchema = new Schema<SubscriptionOption>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: currencyEnum, required: true },
    billingCycle: { type: String, enum: billingCycleEnum, required: true },
    benefits: {
      type: [
        {
          text: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { _id: false } // No queremos IDs individuales para cada opción
);

const SubscriptionSchema = new Schema<Subscription>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: subscriptionTypeEnum,
      required: true,
      default: "simple",
    },

    // Solo para tipo simple
    price: { type: Number },
    currency: { type: String, enum: currencyEnum },
    billingCycle: { type: String, enum: billingCycleEnum },
    benefits: {
      type: [
        {
          text: { type: String, required: true },
        },
      ],
      required: true,
    },

    // Solo para tipo variable
    options: { type: [SubscriptionOptionSchema] },

    // Solo para tipo bundled
    bundledItems: {
        type: [
          {
            itemId: { type: String, required: true },
          },
        ],
        required: true,
      }, // podrían ser IDs de Product o Service
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SubscriptionModel: Model<Subscription> = mongoose.model<Subscription>(
  "Subscription",
  SubscriptionSchema
);

export default SubscriptionModel;
