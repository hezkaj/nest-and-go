import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne, OneToMany,  } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Column_ {
  @ApiProperty({example:'1', description:'уникальный идентификатор столбца'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example:'столбец', description:'название столбца'})
  @Column()
  name: string;
  @ApiProperty({example:'1', description:'положение столбца внутри проекта'})
  @Column()
  pozition: number;

  @ManyToOne((type)=>Project, (project)=>project.id, {cascade:true, onDelete:'CASCADE'})
  project:Project;

  @OneToMany((type)=>Task, (task)=>task.column)
  tasks:Task[];

}