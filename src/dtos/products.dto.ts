import { z } from "zod";

export const createProductDto = z.object({
    idProduct: z.uuid(),
    name: z.string().min(4),
    category: z.string(),
    price: z.array(z.string()),
    inventory: z.number(),
    description: z.string().min(15),
});

//a resposta vai ter o mesmo formato para criar/atualizar
export const responseProductDto = z.object({
    idProduct: z.uuid(),
    name: z.string().min(4),
    category: z.string(),
    price: z.array(z.string()),
    inventory: z.number(),
    description: z.string().min(15),
    createdAt: z.date()
});

export const updateProductDto = z.object({
    name: z.string().min(4),
    category: z.string(),
    price: z.array(z.string()),
    inventory: z.number(),
    description: z.string().min(15),
})

//z.infer? vai extrair os tipos do meu createruser
export type CreateProductDto = z.infer<typeof createProductDto>;
export type UpdateProductDto = z.infer<typeof updateProductDto>;
export type ResponseProductDto = z.infer<typeof responseProductDto>;