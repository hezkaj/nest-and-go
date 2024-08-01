import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, } from 'class-validator';

export class ProfileDto {
  @ApiProperty({example:'Jason', description:'Введите имя для пользователя'})
  @IsString({message:'Имя должено быть строкой'})
  @Length(2,20, {message:'Имя должено содержать не менее 2 и не более 20 символов'})
  name: string;
}