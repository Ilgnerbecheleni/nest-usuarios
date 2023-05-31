/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
    @IsEmail({}, {message:"Insira um e-mail válido"})
    email:string;
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        
    })
    password:string;
}
