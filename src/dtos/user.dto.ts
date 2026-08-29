//! valor será preenchido mais tarde

type Order = {
    idProduct: string;
    idClient: string;
    status: string;
    total: number;
    createdAt: number;
}

export class CreateUserDto {
    idClient!: number;
    name!: string;
    email!: string;
    password!: string;
    userName!: string;
    adress!: string;
    telephone!: number;
    cep!: string;
    cpf!: string
};

//a resposta vai ter o mesmo formato para criar/atualizar
export class responseUserDto {
    name!: string;
    email!: string;
    orders!: Order;
    userName!: string;
    address!: string;
    telephone!: number;
};

export class UpdateUserDto {
    name!: string;
    email!: string;
    userName!: string;
    telephone!: string;
};

export class signInDto {
    email!: string;
    password!: string;
};

//z.infer? vai extrair os tipos do meu createruser
