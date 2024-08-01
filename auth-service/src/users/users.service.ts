import { BadRequestException, Inject, Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'
import { ClientProxy } from '@nestjs/microservices';
import { Message } from 'src/Dto/message';
import { AuthDto } from 'src/Dto/auth.dto';
import { ProfileDto } from 'src/Dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('AUTH_SERVICE') private client: ClientProxy
    
  ) {}
  async createUser(user:object):Promise<User>{
    return await this.usersRepository.save(user)
  }
  async getUserByMail(mail:string):Promise<User>{
    return await this.usersRepository.findOne({where:{email:mail}})
    
  }
  async getUserById(id:string):Promise<User>{
    return await this.usersRepository.findOne({where:{id:id}})
  }
  async getUserByToken(refresh:string):Promise<Object>{
    const user= await this.usersRepository.findOne({where:{refresh_token:refresh}})
    if(user){
      return {id:user.id}
    }
    throw new BadRequestException({message:'Токен не существует'})
  }
  async updateRefresh(id:string, refresh:string, date:Date):Promise<Object>{
    return await this.usersRepository.update(id,{refresh_token:refresh, updated_date:date})
  }
  async getUser(req):Promise<Object>{
    const {id,name,...other}= await this.usersRepository.findOne({where:{id:req.user.id}})
    return{id, name}
  }
  async deleteUser(req):Promise<Message>{
    const user=await this.usersRepository.findOne({where:{id:req.user.id}})
    await this.usersRepository.delete(user.id)

    await this.client.emit('delete_creater',user.id)

    return {message:`Пользователь ${user.email} удален`}
  }
  async updateAuthParams(req, authDto:AuthDto):Promise<Message>{
    const pass=await bcrypt.hash(authDto.password,10)
    await this.usersRepository.update(req.user.id,{email:authDto.email, password:pass})
    return {message:`Пользователь ${authDto.email} обновил свой логин и/или пароль`}
  }
  async updateProfileParams(req, body:ProfileDto):Promise<Object>{
    await this.usersRepository.update(req.user.id,{name:body.name})
    return this.getUser(req)
  }
///////////////////////////////////////////////////////////////////////////
  async getAllUsers():Promise<User[]>{
    return await this.usersRepository.find()
  }
}