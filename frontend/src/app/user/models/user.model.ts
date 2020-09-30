import { Address } from './address.model';

export class User {
  id: string;
  name: string;
  email: string;
  document: string;
  birthDate: string;
  address: Address;
  active: boolean;
}
