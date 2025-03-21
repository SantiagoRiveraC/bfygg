import { Mongoose } from 'mongoose';

export interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
export interface RouteContext {
  params: Promise<{ id: string }>;
}
