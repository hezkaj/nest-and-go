import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/project.entity';
@Entity()
export class Creater {
  @ApiProperty({example:'a0befb0e-9fe3-4cc5-b3fd-0eb8f7980cf3',
     description:'уникальный идентификатор пользователя'})
  @PrimaryColumn()
  id: string;
  @OneToMany((type)=>Project, (project)=>project.creater)
  projects: Project[];
}