import { VariantsRepository } from '../repositories/variant.repository';
import { VariantsService } from '../services/variants.service';
import { describe, expect, beforeEach, vi, test } from 'vitest';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockVariantRepository = {
  create: vi.fn(),
  findVariantById: vi.fn(),
  findAllVariants: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const variant = {
  id: 1,
  name: 'Canecas',
  color: 'azul',
  idProduct: 4,
  stock: 300,
  variantCode: 320,
};

const variants = [
  variant,
  {
    id: 2,
    name: 'Vasos',
    color: 'verde',
    idProduct: 5,
    stock: 20,
    variantCode: 321,
  },
];

describe('Testes da camada de serviço das variantes (sem erros)', () => {
  let service: VariantsService;

  beforeEach(async () => {
    vi.resetAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        VariantsService,
        {
          provide: VariantsRepository,
          useValue: mockVariantRepository,
        },
      ],
    }).compile();

    service = module.get<VariantsService>(VariantsService);
  });

  test('Deve voltar definido', () => {
    expect(service).toBeDefined();
  });

  test('Busca a variante pelo id', async () => {
    mockVariantRepository.findVariantById.mockResolvedValue(variant);
    const resultado = await service.findOneVariant(variant.id);

    expect(resultado).toEqual(variant);
    expect(mockVariantRepository.findVariantById).toHaveBeenCalledWith(
      variant.id,
    );
  });

  test('Busca todas as variantes', async () => {
    mockVariantRepository.findAllVariants.mockResolvedValue(variants);

    await expect(service.findAllVariants()).resolves.toEqual(variants);
    expect(mockVariantRepository.findAllVariants).toHaveBeenCalledOnce();
  });

  test('Retorna lista vazia quando não há variantes', async () => {
    mockVariantRepository.findAllVariants.mockResolvedValue([]);

    await expect(service.findAllVariants()).resolves.toEqual([]);
  });

  test('Cria uma nova variante', async () => {
    mockVariantRepository.create.mockResolvedValue(variant);
    const resultado = await service.createVariant(variant);

    expect(resultado).toEqual(variant);
    expect(mockVariantRepository.create).toHaveBeenCalledWith({
      name: variant.name,
      color: variant.color,
      stock: variant.stock,
      idProduct: variant.idProduct,
      variantCode: variant.variantCode,
    });
  });

  test('Atualizar variante', async () => {
    const dto = {
      name: 'Canecas mais bonitas',
      color: 'azul-escuro',
      idProduct: 5,
      stock: 50,
      variantCode: 450,
    };
    const varianteAtualizada = { ...variant, ...dto };

    mockVariantRepository.findVariantById.mockResolvedValue(variant);
    mockVariantRepository.update.mockResolvedValue(varianteAtualizada);
    const resultado = await service.updateVariant(variant.id, dto);

    expect(resultado).toEqual(varianteAtualizada);
    expect(mockVariantRepository.findVariantById).toHaveBeenCalledWith(
      variant.id,
    );
    expect(mockVariantRepository.update).toHaveBeenCalledWith(variant.id, dto);
  });

  test('Deletar uma variante', async () => {
    mockVariantRepository.findVariantById.mockResolvedValue(variant);
    mockVariantRepository.delete.mockResolvedValue(variant);
    const resultado = await service.deleteVariant(variant.id);

    expect(resultado).toEqual(variant);
    expect(mockVariantRepository.findVariantById).toHaveBeenCalledWith(
      variant.id,
    );
    expect(mockVariantRepository.delete).toHaveBeenCalledWith(variant.id);
  });
});

describe('Testes da camada de serviço de variantes (com erros)', () => {
  let service: VariantsService;

  beforeEach(async () => {
    vi.resetAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        VariantsService,
        {
          provide: VariantsRepository,
          useValue: mockVariantRepository,
        },
      ],
    }).compile();

    service = module.get<VariantsService>(VariantsService);
  });

  test.each([
    {
      campo: 'nome',
      dto: { ...variant, name: '' },
      mensagem: 'Por favor, coloque o nome da variante',
    },
    {
      campo: 'produto',
      dto: { ...variant, idProduct: 0 },
      mensagem: 'Selecione um produto para inserir a variante',
    },
    {
      campo: 'estoque',
      dto: { ...variant, stock: -1 },
      mensagem: 'Por favor, coloque um valor válido para o estoque',
    },
  ])('Rejeita a criação com campos inválidos', async ({ dto, mensagem }) => {
    await expect(service.createVariant(dto)).rejects.toThrow(
      new BadRequestException(mensagem),
    );
    expect(mockVariantRepository.create).not.toHaveBeenCalled();
  });

  test.each([
    {
      campo: 'nome',
      dto: { name: '' },
      mensagem: 'Por favor, coloque o nome da variante',
    },
    {
      campo: 'produto',
      dto: { idProduct: 0 },
      mensagem: 'Por favor, selecione um produto válido para a variante',
    },
    {
      campo: 'estoque',
      dto: { stock: -1 },
      mensagem: 'Por favor, coloque um valor válido para o estoque',
    },
  ])('Rejeita atualização com $campo inválido', async ({ dto, mensagem }) => {
    mockVariantRepository.findVariantById.mockResolvedValue(variant);

    await expect(service.updateVariant(variant.id, dto)).rejects.toThrow(
      new BadRequestException(mensagem),
    );
    expect(mockVariantRepository.update).not.toHaveBeenCalled();
  });

  test('Lança erro ao buscar variante inexistente', async () => {
    mockVariantRepository.findVariantById.mockResolvedValue(null);

    await expect(service.findOneVariant(variant.id)).rejects.toThrow(
      new NotFoundException(`Variante com id:${variant.id} não foi encontrada`),
    );
  });

  test('Lança erro quando o repositório não retorna a lista de variantes', async () => {
    mockVariantRepository.findAllVariants.mockResolvedValue(null);

    await expect(service.findAllVariants()).rejects.toThrow(
      new NotFoundException('Nenhuma variante encontrada'),
    );
  });

  test('Não atualiza variante inexistente', async () => {
    mockVariantRepository.findVariantById.mockResolvedValue(null);

    await expect(
      service.updateVariant(variant.id, { stock: 50 }),
    ).rejects.toThrow(NotFoundException);
    expect(mockVariantRepository.update).not.toHaveBeenCalled();
  });

  test('Não deleta variante inexistente', async () => {
    mockVariantRepository.findVariantById.mockResolvedValue(null);

    await expect(service.deleteVariant(variant.id)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockVariantRepository.delete).not.toHaveBeenCalled();
  });
});
