import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

class CreateColumnDto {
    @ApiProperty({example:'столбец', description:'Введите название столбца'})
    @MaxLength(20, {message:'Не более 20 символов'})
    @IsNotEmpty({message:'Название не должно быть пустым'})
    name: string;
  
}



export{CreateColumnDto,}