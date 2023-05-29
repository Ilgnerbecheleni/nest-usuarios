/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async verifyEmail(email:string){
    try {
      const user = await this.prisma.user.findFirst({where:{
        email:email
       }}); 
       if(user){
        return true
       }
       return false
    } catch (error) {
      throw new BadRequestException("erro ao salvar usuario")
    }

  }


  async create(createUserDto: CreateUserDto) {
    try {
      const {name,password,nickName,role,email}= createUserDto;

      const verify = await this.verifyEmail(email);
      console.log(verify)
      if(verify){
        throw new BadRequestException("Email ja cadastrado!")
      }

      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(password, salt);



      const user = await this.prisma.user.create({
        data: {
          name: name,
          nickName: nickName,
          email: email,
          password: hashed,
          role: role
        }
      })
  
      return user;
    } catch (error) {
      throw new BadRequestException({status:"erro ao salvar usuario",erro:error.message})
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new BadRequestException("erro ao solicitar usuarios")
    }
  
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({where:{
        id: id
      }});
      return user;
    } catch (error) {
      throw new BadRequestException("erro ao solicitar usuarios")
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
   
    try {
      const {name,password,nickName,role,email}= updateUserDto;

      const verify = await this.verifyEmail(email);
      console.log(verify)
      if(verify){
        throw new BadRequestException("Email ja cadastrado!")
      }

      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.create({
        data: {
          name: name,
          nickName: nickName,
          email: email,
          password: hashed,
          role: role
        }
      })
  
      return user;
    } catch (error) {
      throw new BadRequestException({status:"erro ao salvar usuario",erro:error.message})
    }
     }

  remove(id: number) {
   
   
    return `This action removes a #${id} user`;
  }
}
