import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { Creater } from 'src/creater/creater.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  
  ) {}
  async createProject(creater:Creater, projectDto:CreateProjectDto):Promise<Project>{
    return await this.projectsRepository.save({...projectDto, creater:{id:creater.id}});
  }
  async getAllProjects(creater:Creater):Promise<Project[]>{
    return await this.projectsRepository.find({
      where:{creater:{id:creater.id}},
      relations:{
        columns:{
          tasks:true
        }
      }
    });
  }
  async getOneProject(creater:Creater, param):Promise<Project>{
    const proj = await this.projectsRepository.findOne({
      where:{creater:{id:creater.id}, id:param.project_id},
      relations:{
        columns:{
          tasks:true} ,
      }
    });
    if (proj)return proj;
    throw new NotFoundException({message:'Проект не найден'});
  }
  async deleteProject(creater:Creater, param):Promise<boolean>{
    const project=await this.getOneProject(creater,param)
    await this.projectsRepository.remove(project);
    //return await this.projectsRepository.find({where:{creater:creater}});
    return true
    
  }
  async updateProject(creater,param, projectDto):Promise<Project>{
    await this.getOneProject(creater,param)
    await this.projectsRepository.update(param.project_id,{...projectDto})
    return await this.projectsRepository.findOne({where:{id:param.project_id}})
  }

}