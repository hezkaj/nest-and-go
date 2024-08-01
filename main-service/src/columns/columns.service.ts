import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column_ } from './column_.entity';
import { CreateColumnDto } from './column_.dto';
import { Project } from 'src/projects/project.entity';
import { ValidationException } from 'src/validation/validation.exception';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column_)
    private columnsRepository: Repository<Column_>,
  ) {}
  async createColumn(project:Project, columnDto:CreateColumnDto):Promise<Column_>{
    const length=await this.CountColumns(project)
    return await this.columnsRepository.save({
      ...columnDto,pozition: length ,project:{id:project.id}
    })
  }
  async getAllColumns(project:Project):Promise<Column_[]>{
    return await this.columnsRepository.find({
      where:{project:{id:project.id}},
      relations:{tasks:true,project:true}
    })
  }

  async deleteColumn(project:Project, param):Promise<boolean>{
    const column=await this.getOneColumn(project,param)
    let pozition=column.pozition
    await this.columnsRepository.remove(column)
    const listColumn=await this.columnsRepository.find({where:{project:{id:project.id}}})
    for(let col of listColumn){
      if(col.pozition==pozition+1){
        await this.columnsRepository.update(col.id,{pozition:pozition++})
      }
    }
    //return await this.columnsRepository.find({where:{project:{id:project.id}}}) 
    return true
  }
  
  async repozColumn(project:Project,param,pozition:number):Promise<Column_[]>{
    const column=await this.getOneColumn(project,param)
    const length=await this.CountColumns(project)
    if(pozition>length){throw new BadRequestException({
      message:'Несуществующая позиция'
    })}
    const minpoz:number=Math.min(pozition,column.pozition)
    const maxpoz:number=Math.max(pozition,column.pozition)
    let i= maxpoz==pozition ? -1 : 1;
    await this.columnsRepository.update(column.id,{pozition:pozition})
    const list=await this.columnsRepository.find({where:{project:{id:project.id}}})
    for(let col of list){
      if(col.id!=column.id&&col.pozition>=minpoz&&col.pozition<=maxpoz){
        await this.columnsRepository.update(col.id,{pozition:col.pozition+i})
      }
    }
    return await this.columnsRepository.find({
      where:{project:{id:project.id}},
      relations:{tasks:true}
    })
  }

  async getOneColumn(project:Project, param):Promise<Column_>{
    const column=await this.columnsRepository.findOne({
      where:{project:{id:project.id}, id:param.column_id},
      relations:{
        tasks:true,project:true}
    })
    if (column)return column;
    throw new NotFoundException({message:'Столбец не найден'});
  }
  async updateColumn(project:Project,param,columnDto:CreateColumnDto):Promise<Column_>{
    const column=await this.columnsRepository.findOne({
      where:{project:{id:project.id}, id:param.column_id}
    })
    await this.columnsRepository.update(param.column_id,{...columnDto})
    return await this.columnsRepository.findOne({where:{id:param.column_id}}) 
  }
  private async CountColumns(project:Project):Promise<number>{
    const listColumn=await this.columnsRepository.find({where:{project:{id:project.id}}})
    const update_count=listColumn.length+1
    if (update_count>30){throw new ValidationException({
        message:'Нельзя создать более 6 столбцов'
    })}
    return listColumn.length
  }
}