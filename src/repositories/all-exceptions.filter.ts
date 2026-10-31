// all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

//captura qualquer exceção
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  //ArgumentHost: da acesso ao contexto certo de execução(http nesse caso) para retornar argumentos
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    //pega o objeto da resposta
    const response = ctx.getResponse();

    //verifica se é uma exceção
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erro interno no servidor';

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
