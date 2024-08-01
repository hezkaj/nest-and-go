import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import{Column_}from'../columns/column_.entity'
import { ApiProperty } from '@nestjs/swagger';
import { Field } from 'src/fields/field.entity';
import { Creater } from 'src/creater/creater.entity';
@Entity()
export class Project {
  @ApiProperty({example:'1', description:'уникальный идентификатор проекта'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example:'проект', description:'название проекта'})
  @Column()
  name: string;
  @ApiProperty({example:'важный проект', description:'описание проекта'})
  @Column({nullable:true})
  description: string;
  @ApiProperty({example:'2024.01.01:00.00.00', description:'время создания проекта'})
  @CreateDateColumn()
  time_create: string;  
  //@ApiProperty({example:'3422b448-2460-4fd2-9183-8000de6f8343', description:'уникальный идентификатор создателя проекта'})
  //@Column()
  @ManyToOne((type)=>Creater, (creater)=>creater.id, {cascade:true, onDelete:'CASCADE'})
  creater: Creater;

  @OneToMany((type)=>Column_, (column)=>column.project)
  columns: Column_[];

  @OneToMany((type)=>Field, (f)=>f.project)
  fields:Field[];
}