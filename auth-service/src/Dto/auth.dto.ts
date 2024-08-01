import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthDto {
    @ApiProperty({example:'user01@mail.ru', description:'Введите email для пользователя'})
    @IsEmail()
    email: string;
    @ApiProperty({example:'User.001', description:'Введите пароль для пользователя'})
    @IsStrongPassword({},{message:`Пароль должен содержать не меньше 8 символов,
      включая заглавные и строчные буквы, цифры и символы`})
    password: string;
  }