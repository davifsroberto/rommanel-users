import { Document } from 'mongoose';

import { Address } from './address.model';

export class User extends Document {
  id: string;
  name: string;
  email: string;
  document: string;
  birthDate: string;
  address: Address;
  active: boolean;
}
