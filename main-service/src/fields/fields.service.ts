import { Injectable, NotFoundException } from "@nestjs/common";
import { Field } from "./field.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "src/projects/project.entity";
import { CreateFieldDto } from "./field.dto";
import { ValidationException } from "src/validation/validation.exception";

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private fieldsRepository: Repository<Field>,
  ) {}
  async fieldCreate(project:Project, fieldDto:CreateFieldDto):Promise<Field>{
    if(fieldDto.type=='enum'){
      if(fieldDto.enum_array){
        return await this.fieldsRepository.save({project:project,...fieldDto})
      }else{
        throw new ValidationException({message:'Вы не создали ни одного пункта'})
      }
    }

    return await this.fieldsRepository.save({project:project,
      name:fieldDto.name, type:fieldDto.type, enum_array:null})
  }
  async getAllField(project:Project):Promise<Field[]>{
    return await this.fieldsRepository.find({where:{project:{id:project.id}}})
  }
  async deleteField(project:Project, param):Promise<boolean>{
    await this.getOneField(project,param)
    await this.fieldsRepository.delete(param.field_id)
    return true
  }
  async getOneField(project:Project, param):Promise<Field>{
    const field= await this.fieldsRepository.findOne({
      where:{project:{id:project.id}, id:param.field_id}
    })
    if(field)return field
    throw new NotFoundException({message:'Поле не найдено'})
  }
}