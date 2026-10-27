# O que é?

Ele é responsável por receber requisições, processar elas e devolver uma resposta para o cliente. é a camada entre servidor e cliente

**Decorator: Adicionar funcionalidades á um objeto que já existe, sem mudar o código fonte**

@Controller(’nome da rota’)

## Injeção de dependências:

As dependências de um objeto são fornecidos a ele, não é preciso instanciar o serviço manualmente

**Exemplo**:
//injeção de dependência
//O nest cria uma instância do ProductService e entrega para o controller
constructor(private readonly productService: ProductService) {}
//typescript: private readonly -> cria a propriedade da classe e atribui o valor de productService
//readonly: garante que a instância de serviço seja sobreescrita

**Route handlers**:
@Get
@Post
@Patch
@Delete

**Exemplo**:
@Get() -> método http
findAll(): Promise<ResponseProductDto[]> 'retorno do get, em uma array'{
return this.productService.findProducts();
}
