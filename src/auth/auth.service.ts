/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly prisma :PrismaService,
    private jwtService: JwtService) {}

  async login({email,password}:LoginAuthDto){
    try {
      const user = await this.prisma.user.findFirst({
        where:{
          email:email
        }
      });
  
  
          if(!user){
        throw new UnauthorizedException('email or password error!');
      }
  
      const verify = await bcrypt.compare(password,user.password)
     
      if(!verify){
        throw new UnauthorizedException('email or password error!');
      }  

      const payload = { sub: user.id, username: user.name , role:user.role };

      const token = await this.jwtService.sign(payload, { 
        secret:process.env.JWT_SECRET ,
        expiresIn:'8h',
        audience:'login'
      })


      return {acess_token:token};

    } catch (error) {
      throw new BadRequestException({status:"erro ao salvar usuario",erro:error.message})
    }

    


  }
}
