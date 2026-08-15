import { z } from 'zod';

export const createUserDto = z.object({
    idClient: z.uuid(),
    name: z.string().min(4),
    //tirar depois '-' regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //^ coloca a posição já no inicio da string
    //[^\s@] Classe de caracteres: um ou mais caracteres que NÃO são espaço (\s) ou @
    //+ quantifier: corresponde ao token anterior quantas vezes for possível
    //@ text - caracter literal @@
    //\. ponto
    //$ anchor - reafirma a posçião para o fim da string ou depois da linha final - fim da string
    email: z.email(),
    password: z.string().min(6),
    userName: z.string().min(4),
    address: z.string().min(26),
    telephone: z.number(),
    cep: z.number().regex(/^\d{5}(-\d{3})?$/, 'Telefone inválido'),
    cpf: z.number().regex(/\d{3}\.\d{3}\.\d{3}\-\d{2}/, 'CPF inválido')
});

//a resposta vai ter o mesmo formato para criar/atualizar
export const responseUserDto = z.object({
    name: z.string().min(4),
    email: z.email(),
    orders: z.array(z.object({
        idProduct: z.string(),
        idClient: z.string(),
        status: z.string(),
        total: z.number(),
        createdAt: z.date(),
    })),
    userName: z.string().min(4),
    address: z.string().min(26),
    telephone: z.number(),
});

export const updateUserDto = z.object({
    name: z.string().min(4).optional,
    email: z.email().optional,
    userName: z.string().min(4).optional,
    telephone: z.number().optional,
});

export const signInDto = z.object({
    email: z.email(),
    password: z.string().min(6),
});

//z.infer? vai extrair os tipos do meu createruser
export type CreateUserDto = z.infer<typeof createUserDto>;
export type ResponseUserDto = z.infer<typeof responseUserDto>;