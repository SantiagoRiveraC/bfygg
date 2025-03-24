import { Mongoose } from 'mongoose';

export interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

export interface User {
  id: number,
  firstName: string,
  email: string,
  role: string,
  status: string,
  lastLogin: string,
  createdAt: string,
}