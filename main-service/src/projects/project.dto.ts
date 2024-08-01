import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsOptional } from 'class-validator';


class CreateProjectDto {
  @ApiProperty({example:'проект', description:'Введите название проекта'})
  @Length(2,20, {message:'Не более 20 символов и не менее 2'})
  @IsNotEmpty({message:'Название не должно быть пустым'})
  name: string;
  @ApiProperty({example:'важный проект', description:'Введите описание проекта'})
  @IsOptional()
  @Length(0, 280, {message:'Не более 280 символов'})
  description: string;
  
}

export{CreateProjectDto,}