import mongoose, { Schema, Document, Model } from 'mongoose';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  currency: 'USD' | 'COP' | 'EUR';
  availability: boolean;
}

const currencyEnum = ['USD', 'COP', 'EUR'] as const;

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: currencyEnum, required: true, default: 'USD' },
    availability: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel: Model<Product> = mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;