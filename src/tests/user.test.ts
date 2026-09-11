import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';

const mockUserRepository = {
  create: vi.fn(),
  findUserById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('Testes do repositório do usuário', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository, // Quando o Nest procurar por isso...
          useValue: mockUserRepository, // ...ele vai injetar isso.
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  test('Deve voltar definido', () => {
    expect(service).toBeDefined();
  });

  test('Busca o usuário pelo id', async () => {
    const usuario = {
      adress: 'rua sao longinho 123, centro',
      cep: '87745',
      cpf: '456432357623',
      email: 'samps@gmail.com',
      idClient: 1,
      name: 'nome',
      password: 'senhatop',
      telephone: '11 654323235',
      userName: 'usuario',
    };

    //configura o retorno do usuario, faz o mock retornar uma promise
    mockUserRepository.findUserById.mockResolvedValue(usuario);
    const resultado = await service.findOneUser(usuario.idClient);
    console.log('usuario pelo id', resultado);
    expect(resultado).toEqual(usuario);
  });

  test('Cria um novo usuário', async () => {
    const usuario = {
      adress: 'rua sao longinho 123, centro',
      cep: 87745,
      cpf: '456432357623',
      email: 'sampaiolaura@gmail.com',
      name: 'nome',
      password: 'senhatop',
      telephone: 11654323235,
      userName: 'usuario',
    };

    mockUserRepository.create.mockResolvedValue(usuario);
    const resultado = await service.createUser(usuario);

    expect(resultado).toEqual(
      expect.objectContaining({
        name: 'nome',
        email: 'sampaiolaura@gmail.com',
        userName: 'usuario',
      }),
    );
  });

  test('Atualizar informações do usuário', async () => {
    const usuario = {
      idClient: 1,
      name: 'nome',
      email: 'samps@gmail.com',
      password: 'senhatop',
      userName: 'usuario',
      adress: 'rua sao longinho 123, centro',
      telephone: '11 654323235',
      cep: '87745',
      cpf: '456432357623',
    };

    //atualizações
    const usuarioAtualizado = {
      idClient: 1,
      name: 'nome mais legal',
      password: 'senhaFacil123',
      adress: 'barra funda, centro, 123',
    };

    mockUserRepository.update.mockResolvedValue(usuarioAtualizado);
    const resultado = await service.updateUser(
      usuario.idClient,
      usuarioAtualizado,
    );

    expect(resultado).toEqual(
      expect.objectContaining({
        name: 'nome mais legal',
        password: 'senhaFacil123',
        adress: 'barra funda, centro, 123',
      }),
    );
  });

  // test('Fazer login', () => {
  //   const usuario = {
  //     email: 'email@gmail.com',
  //     senha: 'senha123',
  //   };
  // });
});
