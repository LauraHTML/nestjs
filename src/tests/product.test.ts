import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { describe, expect, beforeEach, vi, test } from 'vitest';
import { Test } from '@nestjs/testing';

const mockProductRepository = {
  create: vi.fn(),
  findProductById: vi.fn(),
  findAllProducts: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const produto = {
  id: 1,
  name: 'caneca',
  idCategory: 3,
  price: 24.8,
  description: 'Caneca de chá de cerâmica',
  stock: 300,
};

const produtoAtualizado = {
  price: 26.0,
  description: 'Caneca de café de cerâmica',
};

const produtos = [
  {
    id: 1,
    name: 'caneca',
    idCategory: 3,
    price: 24.8,
    description: 'Caneca de chá de cerâmica',
    inventory: 300,
  },
  {
    id: 2,
    name: 'vaso',
    idCategory: 3,
    price: 24.8,
    description: 'Vaso irado',
    inventory: 300,
  },
];

const categoria = {
  id: 3,
  categoryName: 'canecas',
  description: 'string',
};

const variante = [
  {
    name: 'azul',
    color: 3,
    idProduct: 1,
    stock: 100,
    variantCode: 1,
  },
  {
    name: 'rosa',
    color: 3,
    idProduct: 1,
    stock: 100,
    variantCode: 2,
  },
  {
    name: 'laranja',
    color: 3,
    idProduct: 1,
    stock: 100,
    variantCode: 3,
  },
];

describe('Testes da camada serviço das categorias (sem erros)', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  test('Deve voltar definido', () => {
    expect(service).toBeDefined();
  });

  test('Buscar produto por id', async () => {
    mockProductRepository.findProductById.mockResolvedValue(produto);
    const resultado = await service.findOneProduct(produto.id);

    expect(resultado).toEqual(produto);
  });

  test('Buscar produtos', async () => {
    mockProductRepository.findAllProducts.mockResolvedValue(produtos);
    const resultados = await service.findProducts();

    expect(resultados).toEqual(produtos);
  });

  test('Cria um novo produto', async () => {
    mockProductRepository.create.mockResolvedValue(produto);
    const resultado = await service.createProduct(produto);

    expect(resultado).toEqual(produto);
  });

  test('Atualizar produto', async () => {
    mockProductRepository.update.mockResolvedValue(produtoAtualizado);
    const resultado = await service.updateProduct(
      produto.id,
      produtoAtualizado,
    );

    expect(resultado).toContain(
      expect.objectContaining({
        price: 26.0,
        description: 'Caneca de café de cerâmica',
      }),
    );
  });
});
