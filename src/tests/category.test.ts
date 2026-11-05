import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

const mockCategoryRepository = {
  create: vi.fn(),
  findCategoryById: vi.fn(),
  findAllCategories: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const categoria = {
  id: 1,
  categoryName: 'Vasos',
  description: 'Vasos de porcelana para decoração de interiores',
};
//atualizações
const categoriaAtualizada = {
  id: 1,
  categoryName: 'Vasos de flor',
  description: 'Vasos de porcelana para colocar no jardim',
};

describe('Testes da camada serviço das categorias (sem erros)', () => {
  let service: CategoryService;

  beforeEach(async () => {
    vi.resetAllMocks();
    vi.resetAllMocks();

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
    mockCategoryRepository.findCategoryById.mockResolvedValue(categoria);
    const resultado = await service.findOneCategory(categoria.id);
    console.log('categoria pelo id: ', resultado);
    expect(resultado).toEqual(categoria);
  });

  test('Cria uma nova categoria', async () => {
    mockCategoryRepository.create.mockResolvedValue(categoria);
    const resultado = await service.createCategory(categoria);

    expect(resultado).toEqual(categoria);
  });

  test('Atualizar categoria', async () => {
    mockCategoryRepository.findCategoryById.mockResolvedValue(categoria);
    mockCategoryRepository.update.mockResolvedValue(categoriaAtualizada);
    const resultado = await service.updateCategory(
      categoria.id,
      categoriaAtualizada,
    );

    expect.objectContaining({
      categoryName: 'Vasos de flor',
      description: 'Vasos belos com flor',
    });
  });

  test('Deletar categoria', async () => {
    mockCategoryRepository.findCategoryById.mockResolvedValue(categoria);
    const categoriaEncontrada = await service.findOneCategory(categoria.id);
    expect(categoriaEncontrada).toEqual(categoria);

    mockCategoryRepository.delete.mockResolvedValue(categoria);
    const resultado = await service.deleteCategory(categoria.id);

    expect(resultado).toEqual(categoria);
    expect(mockCategoryRepository.delete).toHaveBeenCalledWith(categoria.id);
  });
});

describe('Testes com valores inválidos', () => {
  let service: CategoryService;

  beforeEach(async () => {
    vi.resetAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();
    //obtém o servico CategoryService
    //module.get(indentificador para encontra-lo) pede o serviço registrado no módulo ao conteiner de injeção
    service = module.get<CategoryService>(CategoryService);
  });

  //test.each: quando precisa rodar o mesmo teste com váriaveis diferentes

  test.each([
    {
      campo: 'categoryName',
      dto: { ...categoria, categoryName: '' },
      mensagem: 'Por favor, coloque um nome para a categoria',
    },
    {
      campo: 'description',
      dto: { ...categoria, description: '' },
      mensagem:
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
    },
    {
      campo: 'description',
      dto: { ...categoria, description: 'Um vaso' },
      mensagem:
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
    },
  ])('Rejeita criação com campos inválidos', async ({ dto, mensagem }) => {
    await expect(service.createCategory(dto)).rejects.toThrow(
      new BadRequestException(mensagem),
    );
    expect(mockCategoryRepository.create).not.toHaveBeenCalled();
  });

  test.each([
    {
      campo: 'categoryName',
      dto: { ...categoria, categoryName: '' },
      mensagem: 'Por favor, coloque um nome para a categoria',
    },
    {
      campo: 'description',
      dto: { ...categoria, description: '' },
      mensagem:
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
    },
    {
      campo: 'description',
      dto: { ...categoria, description: 'Caderno de anotação' },
      mensagem:
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
    },
  ])(
    'Rejeita a atualização de categorias com campos inválidos',
    async ({ dto, mensagem }) => {
      mockCategoryRepository.findCategoryById.mockResolvedValue(categoria);

      await expect(service.updateCategory(categoria.id, dto)).rejects.toThrow(
        new BadRequestException(mensagem),
      );

      expect(mockCategoryRepository.update).not.toHaveBeenCalled();
    },
  );

  test('Não atualiza categoria inexistente', async () => {
    mockCategoryRepository.findCategoryById.mockResolvedValue(null);

    await expect(
      service.updateCategory(categoria.id, { categoryName: 'Jardinagem' }),
    ).rejects.toThrow(NotFoundException);
    expect(mockCategoryRepository.update).not.toHaveBeenCalled();
  });

  test('Não deleta categoria inexistente', async () => {
    mockCategoryRepository.findCategoryById.mockResolvedValue(null);

    await expect(service.deleteCategory(categoria.id)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockCategoryRepository.delete).not.toHaveBeenCalled();
  });

  test('Lança erro ao buscar categoria inexistente', async () => {
    mockCategoryRepository.findCategoryById.mockResolvedValue(null);

    await expect(service.findOneCategory(categoria.id)).rejects.toThrow(
      new NotFoundException(
        `Categoria com id:${categoria.id} não foi encontrada`,
      ),
    );
  });

  test('Lança erro se o repositório não retorna a lista de categorias', async () => {
    mockCategoryRepository.findAllCategories.mockResolvedValue(null);

    await expect(service.findAllCategories()).rejects.toThrow(
      new NotFoundException('Nenhuma categoria foi encontrada'),
    );
  });
});
