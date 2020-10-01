export class Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  additionalDetails: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
}

export class CepConsult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
