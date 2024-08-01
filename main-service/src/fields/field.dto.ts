import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { fieldType } from "./field.entity";
import { DeepPartial } from "typeorm";

export class CreateFieldDto{
    @ApiProperty({example:'поле', description:'Введите название поля задачи'})
    @IsNotEmpty({message:'Название не должно быть пустым'})
    @MaxLength(20, {message:'Не более 20 символов'})
    name: string;
    @ApiProperty({example:'string', description:'Введите тип поля'})
    @IsEnum(fieldType)
    type:DeepPartial<fieldType>;
    @ApiProperty({example:'["да", "нет"]', description:'введите варианты значений поля задач при типе перечисление'})
    @IsOptional()
    enum_array:string[]
}