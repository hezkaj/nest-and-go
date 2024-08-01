import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsString, IsStrongPassword, Length, } from 'class-validator';

export class CreateDto {
  @ApiProperty({example:'user01@mail.ru', description:'Введите email для пользователя'})
  @IsEmail()
  email: string;
  @ApiProperty({example:'User.001', description:'Введите пароль для пользователя'})
  @IsStrongPassword({},{message:`Пароль должен содержать не меньше 8 символов,
      включая заглавные и строчные буквы, цифры и символы`})
  password: string;
  @ApiProperty({example:'Jason', description:'Введите имя для пользователя'})
  @IsString({message:'Имя должено быть строкой'})
  @Length(2,20, {message:'Имя должено содержать не менее 2 и не более 20 символов'})
  name: string;
}



