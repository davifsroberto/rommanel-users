import * as mongoose from 'mongoose';

import { AdressSchema } from './address.schema';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  document: String,
  birthDate: String,
  address: AdressSchema,
  active: Boolean,
});