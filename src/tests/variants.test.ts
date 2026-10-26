import { VariantService } from '../services/variants.service';
import { VariantsRepository } from '../repositories/variant.repository';
import { describe, expect, beforeEach, vi, test } from 'vitest';
import { Test } from '@nestjs/testing';

const mockVariantRepository = {
  create: vi.fn(),
  findVariantById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('Testes da camada serviço das categorias (sem erros)', () => {
  let service: VariantService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VariantService,
        {
          provide: VariantsRepository,
          useValue: mockVariantRepository,
        },
      ],
    }).compile();

    service = module.get<VariantService>(VariantService);
  });

  test('Deve voltar definido', () => {
    expect(service).toBeDefined();
  });

  test('Busca a variante pelo id', async () => {
    const variant = {
      id: 1,
      categoryName: 'Vasos',
      description: 'Vasos belos',
    };

    mockVariantRepository.findVariantById.mockResolvedValue(variant);
    const resultado = await service.findOneVariant(variant.id);
    expect(resultado).toEqual(variant);
  });

  test('Cria uma nova variante', async () => {
    const variant = {
      id: 1,
      name: 'Canecas',
      color: 'azul',
      idProduct: 4,
      stock: 300,
      variantCode: 320,
    };

    mockVariantRepository.create.mockResolvedValue(variant);
    const resultado = await service.createVariant(variant);

    expect(resultado).toEqual(variant);
  });

  test('Atualizar variante', async () => {
    const variant = {
      id: 1,
      name: 'Canecas',
      color: 'azul',
      idProduct: 4,
      stock: 300,
      variantCode: 320,
    };

    //atualizações
    const varianteAtualizada = {
      id: 1,
      name: 'Canecas mais bonitas',
      color: 'azul-escuro',
    };

    mockVariantRepository.update.mockResolvedValue(varianteAtualizada);
    const resultado = await service.updateVariant(
      variant.id,
      varianteAtualizada,
    );

    expect(resultado).toEqual(
      expect.objectContaining({
        name: 'Canecas mais bonitas',
        color: 'azul-escuro',
      }),
    );
  });

  test('Deletar uma variante', async () => {
    const variant = {
      id: 1,
      name: 'Canecas mais bonitas',
      color: 'azul-escuro',
      idProduct: 4,
      stock: 300,
      variantCode: 320,
    };

    mockVariantRepository.findVariantById.mockResolvedValue(variant);
    const varianteEncontrada = await service.findOneVariant(variant.id);
    expect(varianteEncontrada).toEqual(variant);

    mockVariantRepository.delete.mockResolvedValue(variant);
    const resultado = await service.deleteVariant(variant.id);

    expect(resultado).toEqual(variant);
    expect(mockVariantRepository.delete).toHaveBeenCalledWith(variant.id);
  });
});
