//! valor será preenchido mais tarde

type Order = {
  idProduct: string;
  idClient: string;
  status: string;
  total: number;
  createdAt: number;
};

export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  userName!: string;
  adress!: string;
  telephone!: number;
  cep!: number;
  cpf!: string;
}

//a resposta vai ter o mesmo formato para criar/atualizar
export class responseUserDto {
  name!: string;
  email!: string;
  orders!: Order;
  userName!: string;
  address!: string;
  telephone!: number;
}

export class UpdateUserDto {
  idClient!: number | null;
  name?: string | null;
  email?: string | null;
  userName?: string | null;
  telephone?: string | null;
  adress?: string | null;
  password?: string | null;
}

export class signInDto {
  email!: string;
  password!: string;
}
