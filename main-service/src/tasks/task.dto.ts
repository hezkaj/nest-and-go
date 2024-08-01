import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

class CreateTaskDto {
  @ApiProperty({example:'задача', description:'Введите название задачи'})
  @IsNotEmpty({message:'Название не должно быть пустым'})
  @MaxLength(20, {message:'Не более 20 символов'})
  name: string;
  @ApiProperty({example:'сложная задача', description:'Введите описание задачи'})
  @IsOptional()
  @MaxLength(280, {message:'Не более 280 символов'})
  description: string;
  
  
}



export{CreateTaskDto}