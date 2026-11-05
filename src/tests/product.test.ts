import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { describe, expect, beforeEach, vi, test } from 'vitest';
import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
    stock: 300,
  },
  {
    id: 2,
    name: 'vaso',
    idCategory: 3,
    price: 24.8,
    description: 'Vaso irado',
    stock: 300,
  },
];

describe('Testes da camada serviço dos produtos (sem erros)', () => {
  let service: ProductService;

  beforeEach(async () => {
    vi.resetAllMocks();

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

    expect(mockProductRepository.create).toHaveBeenCalledWith({
      name: produto.name,
      idCategory: produto.idCategory,
      price: produto.price,
      description: produto.description,
      stock: produto.stock,
    });
    expect(resultado).toEqual(produto);
  });

  test('Atualizar produto', async () => {
    mockProductRepository.findProductById.mockResolvedValue(produto);
    mockProductRepository.update.mockResolvedValue(produtoAtualizado);
    const resultado = await service.updateProduct(
      produto.id,
      produtoAtualizado,
    );

    expect(mockProductRepository.findProductById).toHaveBeenCalledWith(
      produto.id,
    );
    expect(mockProductRepository.update).toHaveBeenCalledWith(produto.id, {
      price: 26.0,
      description: 'Caneca de café de cerâmica',
    });
    expect(resultado).toEqual(
      expect.objectContaining({
        price: 26.0,
        description: 'Caneca de café de cerâmica',
      }),
    );
  });

  test('Deletar produto', async () => {
    mockProductRepository.findProductById.mockResolvedValue(produto);
    mockProductRepository.delete.mockResolvedValue(produto);
    const resultado = await service.deleteProduct(produto.id);

    expect(mockProductRepository.findProductById).toHaveBeenCalledWith(
      produto.id,
    );
    expect(resultado).toEqual(produto);
    expect(mockProductRepository.delete).toHaveBeenCalledWith(produto.id);
  });

  test('Retorna lista vazia quando o repositório não encontra produtos', async () => {
    mockProductRepository.findAllProducts.mockResolvedValue([]);

    await expect(service.findProducts()).resolves.toEqual([]);
  });

  test('Mapeia os produtos para o formato de resposta', async () => {
    const produtoComDadosExtras = {
      ...produto,
      Categories: [{ id: 3 }],
      Variants: [{ id: 1 }],
    };
    mockProductRepository.findAllProducts.mockResolvedValue([
      produtoComDadosExtras,
    ]);

    await expect(service.findProducts()).resolves.toEqual([produto]);
  });
});

describe('Testes da camada serviço dos produtos (com erros)', () => {
  let service: ProductService;

  beforeEach(async () => {
    vi.resetAllMocks();

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

  test.each([
    {
      campo: 'nome',
      dto: { ...produto, name: '' },
      mensagem: 'Por favor, coloque o nome do produto',
    },
    {
      campo: 'preço',
      dto: { ...produto, price: 9.99 },
      mensagem: 'Por favor, coloque um preço válido para o produto',
    },
    {
      campo: 'estoque',
      dto: { ...produto, stock: -1 },
      mensagem: 'Por favor, coloque um valor válido para o estoque',
    },
    {
      campo: 'descrição',
      dto: { ...produto, description: 'Descrição curta' },
      mensagem: 'Por favor, escreva uma descrição mais completa para o produto',
    },
  ])('Rejeita criação com campos inválidos', async ({ dto, mensagem }) => {
    await expect(service.createProduct(dto)).rejects.toThrow(
      new BadRequestException(mensagem),
    );
    expect(mockProductRepository.create).not.toHaveBeenCalled();
  });

  test('Rejeita a criação se o produto retornado não tiver id', async () => {
    mockProductRepository.create.mockResolvedValue({
      ...produto,
      id: undefined,
    });

    await expect(service.createProduct(produto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  test('Lança erro ao buscar produto inexistente', async () => {
    mockProductRepository.findProductById.mockResolvedValue(null);

    await expect(service.findOneProduct(produto.id)).rejects.toThrow(
      new NotFoundException(`Produto com id:${produto.id} não foi encontrado`),
    );
  });

  test('Lança erro quando o repositório não retorna a lista de produtos', async () => {
    mockProductRepository.findAllProducts.mockResolvedValue(null);

    await expect(service.findProducts()).rejects.toThrow(
      new NotFoundException('Nenhum produto foi encontrado'),
    );
  });

  test.each([
    {
      campo: 'nome',
      dto: { name: '' },
      mensagem: 'Por favor, coloque o nome do produto',
    },
    {
      campo: 'preço',
      dto: { price: 9.99 },
      mensagem: 'Por favor, coloque um preço válido para o produto',
    },
    {
      campo: 'estoque',
      dto: { stock: -1 },
      mensagem: 'Por favor, coloque um valor válido para o estoque',
    },
    {
      campo: 'descrição',
      dto: { description: 'Descrição curta' },
      mensagem: 'Por favor, escreva uma descrição mais completa para o produto',
    },
  ])('Rejeita atualização com campos inválidos', async ({ dto, mensagem }) => {
    mockProductRepository.findProductById.mockResolvedValue(produto);

    await expect(service.updateProduct(produto.id, dto)).rejects.toThrow(
      new BadRequestException(mensagem),
    );
    expect(mockProductRepository.update).not.toHaveBeenCalled();
  });

  test('Não atualiza produto inexistente', async () => {
    mockProductRepository.findProductById.mockResolvedValue(null);

    await expect(
      service.updateProduct(produto.id, { price: 26 }),
    ).rejects.toThrow(NotFoundException);
    expect(mockProductRepository.update).not.toHaveBeenCalled();
  });

  test('Não deleta produto inexistente', async () => {
    mockProductRepository.findProductById.mockResolvedValue(null);

    await expect(service.deleteProduct(produto.id)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockProductRepository.delete).not.toHaveBeenCalled();
  });
});
