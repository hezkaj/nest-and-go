import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


class CreateStringFieldDto{
    @ApiProperty({example:'текстовое значение', description:'Введите значение поля задачи'})
    @IsNotEmpty({message:'Поле не должно быть пустым'})
    @MaxLength(40, {message:'Не более 40 символов'})
    @IsString({message:'Значение должно быть строкой'})
    value: string;

}

class CreateNumberFieldDto{
    @ApiProperty({example:'10', description:'Введите значение поля задачи'})
    @IsNotEmpty({message:'Поле не должно быть пустым'})
    @IsNumber()
    value: number;

}


export{CreateNumberFieldDto, CreateStringFieldDto}