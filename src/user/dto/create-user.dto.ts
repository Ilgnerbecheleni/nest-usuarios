/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
   @IsString()
    name:string;
    @IsString()
    nickName:string;
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
    role:any;
}
