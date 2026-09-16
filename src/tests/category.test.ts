import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';

const mockCategoryRepository = {
  create: vi.fn(),
  findCategoryById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('Testes da camada serviço das categorias (sem erros)', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  test('Deve voltar definido', () => {
    expect(service).toBeDefined();
  });

  test('Busca a categoria pelo id', async () => {
    const category = {
      id: 1,
      categoryName: 'Vasos',
      description: 'Vasos belos',
    };

    mockCategoryRepository.findCategoryById.mockResolvedValue(category);
    const resultado = await service.findOneCategory(category.id);
    console.log('categoria pelo id: ', resultado);
    expect(resultado).toEqual(category);
  });

  test('Cria uma nova categoria', async () => {
    const category = {
      id: 1,
      categoryName: 'Canecas',
      description: 'Canecas legais para todas e todes',
    };

    mockCategoryRepository.create.mockResolvedValue(category);
    const resultado = await service.createCategory(category);

    expect(resultado).toEqual(category);
  });

  test('Atualizar categoria', async () => {
    const category = {
      id: 1,
      categoryName: 'Vasos',
      description: 'Vasos belos',
    };

    //atualizações
    const categoryAtualizado = {
      id: 1,
      categoryName: 'Vasos de flor',
      description: 'Vasos belos com flor',
    };

    mockCategoryRepository.update.mockResolvedValue(categoryAtualizado);
    const resultado = await service.updateCategory(
      category.id,
      categoryAtualizado,
    );

    expect(resultado).toEqual(
      expect.objectContaining({
        categoryName: 'Vasos de flor',
        description: 'Vasos belos com flor',
      }),
    );
  });
});
