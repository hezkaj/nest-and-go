import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Column_ } from 'src/columns/column_.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({example:'1', description:'уникальный идентификатор задачи'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example:'задача', description:'название задачи'})
  @Column()
  name: string;
  @ApiProperty({example:'сложная задача', description:'описание задачи'})
  @Column({default:''})
  description: string;
  @ApiProperty({example:'2024.01.01:00.00.00', description:'время создания задачи'})
  @CreateDateColumn()
  time_create: string;  

  @ApiProperty({example:'1', description:'положение задачи внутри столбца'})
  @Column()
  pozition: number;

  @ManyToOne((type)=>Column_, (column)=>column.id, {cascade:true, onDelete:'CASCADE'})
  column:Column_;

}