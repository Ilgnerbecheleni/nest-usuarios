/* eslint-disable prettier/prettier */
import { Controller,  Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginauthdto: LoginAuthDto) {
    return this.authService.login(loginauthdto);
  }

 
}
