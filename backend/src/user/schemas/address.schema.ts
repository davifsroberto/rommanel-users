import * as mongoose from 'mongoose';

export const AdressSchema = new mongoose.Schema({
  street: String,
  number: String,
  additionalDetails: String,
  neighborhood: String,
  zipCode: String,
  city: String,
  state: String,
});
