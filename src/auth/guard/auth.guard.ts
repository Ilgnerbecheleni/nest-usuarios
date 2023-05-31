/* eslint-disable prettier/prettier */import {
  CanActivate, // Importa a interface CanActivate para implementar o guard
  ExecutionContext,
  Injectable, // Importa o decorator Injectable para marcar a classe como injetável
  UnauthorizedException, // Importa a exceção UnauthorizedException para lançar em caso de não autorização
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt'; // Importa o JwtService para verificar e decodificar tokens JWT
import { Request } from 'express'; // Importa a classe Request do pacote express para manipulação de solicitações HTTP

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // Construtor que recebe uma instância do JwtService para verificar e decodificar tokens JWT

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Obtém o objeto de solicitação HTTP do contexto

    const token = this.extractTokenFromHeader(request);
    // Extrai o token de autenticação do cabeçalho da solicitação

    if (!token) {
      throw new UnauthorizedException();
    }
    // Se não houver token, lança uma exceção UnauthorizedException

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // Verifica e decodifica o token usando o JwtService e a chave secreta fornecida

      request['user'] = payload;
      // Atribui o payload (conteúdo) do token ao objeto 'user' dentro do objeto 'request'

    } catch {
      throw new UnauthorizedException();
    }
    // Em caso de erro na verificação do token, lança uma exceção UnauthorizedException

    return true;
    // Retorna true para indicar que a solicitação está autorizada
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Divide o cabeçalho de autorização para obter o tipo e o token

    return type === 'Bearer' ? token : undefined;
    // Retorna o token se o tipo for 'Bearer', caso contrário, retorna undefined
  }
}