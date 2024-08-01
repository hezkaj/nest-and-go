import { Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/project.entity';

export enum fieldType{
    string='string',
    number='number',
    enum='enum'
}

@Entity()
export class Field {
    @ApiProperty({example:'1', description:'уникальный идентификатор поля'})
    @PrimaryGeneratedColumn()
    id:number;
    @ApiProperty({example:'поле 1', description:'название поля задачи'})
    @Column()
    name:string;
    @ApiProperty({example:'string', description:'тип поля задачи'})
    @Column({
        type: "enum",
        enum: fieldType,
        default: fieldType.string,
        })
    type:fieldType;
    @ApiProperty({example:'["да", "нет"]', description:'варианты значений поля задач при типе перечисление'})
    @Column('text',{array:true, default:[], nullable:true})
    enum_array:string[]

    @ManyToOne((type)=>Project, (project)=>project.id, {cascade:true, onDelete:'CASCADE'})
    project:Project;

}
