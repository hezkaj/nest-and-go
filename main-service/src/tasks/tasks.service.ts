import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { ValidationException } from 'src/validation/validation.exception';
import { Column_ } from 'src/columns/column_.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async createTask( taskDto:CreateTaskDto, column: Column_,):Promise<Task>{
    const length=await this.CountTasks(column)
    return await this.tasksRepository.save({
      ...taskDto,pozition:length ,column:{id:column.id}
    })
  }
  async deleteTask(column:Column_,param):Promise<boolean>{
    const task=await this.getOneTask(column,param)
    let pozition=task.pozition
    await this.tasksRepository.remove(task)
    const listTask=await this.tasksRepository.find({where:{
      column:{id:column.id}
    }})
    for(let t of listTask){
      if(t.pozition==pozition+1){
        await this.tasksRepository.update(t.id,{pozition:pozition++})
      }
    }
    //return await this.tasksRepository.find({where:{column:{id:column.id}}})
    return true
  }
  async updateTask(column:Column_,param,taskDto:CreateTaskDto):Promise<Task>{
    const task=await this.getOneTask(column,param)
    await this.tasksRepository.save({...taskDto, id:task.id, 
      pozition:task.pozition, column:{id:column.id}})
    return await this.tasksRepository.findOne({
      where:{ id:task.id},
      relations:{ 
        column:{project:true}
      }
    })
  }
  

  async repozTask(column:Column_,param,body):Promise<any>{
    let pozition:number=body.pozition
    const columnId:number=body.columnId
    const task=await this.getOneTask(column,param)
    const length=await this.CountTasks(column)
    await this.tasksRepository.update(task.id,{pozition:pozition, column:{id:columnId}})
    let pozX=task.pozition
    if(columnId==param.column_id){
      if(pozition>=length){throw new BadRequestException({
        message:'Несуществующая позиция'
      })}
      const minpoz:number=Math.min(pozition,task.pozition)
      const maxpoz:number=Math.max(pozition,task.pozition)
      let i=1;
      if(maxpoz==pozition){i=-1}
      await this.tasksRepository.update(task.id,{pozition:pozition})
      const taskListTo=await this.tasksRepository.find({where:{column:{id:columnId}}})
      for(let t of taskListTo){
        if(t.id!=task.id&&t.pozition>=minpoz&&t.pozition<=maxpoz){
          let poz=t.pozition+i
          await this.tasksRepository.update(t.id,{pozition:poz})
        }
      }
      return await this.tasksRepository.find({where:{column:{id:columnId}}})
    }else{
      if(pozition>length){throw new BadRequestException({
        message:'Несуществующая позиция'
      })}
      await this.tasksRepository.update(task.id,{pozition:pozition, column:{id:columnId}})
      const taskListTo=await this.tasksRepository.find({where:{column:{ id:columnId}}})
      for(let t of taskListTo){
        if(t.id!=task.id&&t.pozition==pozition){
          await this.tasksRepository.update(t.id,{pozition:++pozition})
        }
      }
      const rezultlist=[await this.tasksRepository.find({where:{column:{ id:columnId}}})]
      const taskListFrom=await this.tasksRepository.find({where:{column:{id:column.id}}})
      for(let t of taskListFrom){
        if(t.pozition==pozX+1){
          await this.tasksRepository.update(t.id,{pozition:pozX++})
        }
      }
      rezultlist.push(await this.tasksRepository.find({where:{column:{id:column.id}}}))
      return rezultlist
    } 
  }

  async getTasksOfColumn(column:Column_):Promise<Task[]>{
    return await this.tasksRepository.find({
      where:{column:{id:column.id}},
      relations:{ 
        column:{project:true}
      }
    })
  }

  async getOneTask(column:Column_,param):Promise<Task>{
    const task= await this.tasksRepository.findOne(
      {where:{column:{id:column.id}, id:param.task_id},
      relations:{ 
        column:{project:true}}
    })
    if(task)return task;
    throw new NotFoundException({message:'Задача не найдена в указанном столбце'})
  }


  private async CountTasks(column:Column_):Promise<number>{
    const listTask=await this.tasksRepository.find({where:{column:{project:column.project}}})
    if (listTask.length+1>60){throw new ValidationException({
        message:'Нельзя создать более 60 задач'
    })}
    const listTaskInColumn=await this.tasksRepository.find({where:{
      column:{id:column.id}}})
    return listTaskInColumn.length
  }

}