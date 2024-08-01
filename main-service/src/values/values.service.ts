import { Injectable } from "@nestjs/common";
import { Task } from "src/tasks/task.entity";
import { Field } from "src/fields/field.entity";
import { CreateNumberFieldDto, CreateStringFieldDto } from "./values.dto";
import { ValidationException } from "src/validation/validation.exception";
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
@Injectable()
export class ValuesService {
  
  constructor(
    private amqpConnection:AmqpConnection
  ) {}
  
  async createValues(putField:Field[], value, task:Task):Promise<{}>{
    if (putField.length){
      const field_and_value={}
      for (let field of putField){
        if(field.type=='string'){
          let stringDto:CreateStringFieldDto;
          stringDto ={value:value[field.name]}  
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['createStringValue',stringDto.value,task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        }else if(field.type=='number'){
          let numberDto:CreateNumberFieldDto;
          numberDto = {value:value[field.name]} 
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['createNumberValue',numberDto.value.toString(),task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        } else if(field.type=='enum'){
          if(field.enum_array.includes(value[field.name])){
            let stringDto:CreateStringFieldDto;
            stringDto = {value:value[field.name]} 
            const res=await this.amqpConnection.request<string>({
              exchange: 'exchange1',
              routingKey:'test',
              payload: {
                request: ['createEnumValue',stringDto.value,task.id.toString(),field.id.toString()],
              },
              timeout: 30000,
            })
            console.log("res: ",res)
            field_and_value[field.name]=res
          }else{
            throw new ValidationException({message:'В списке нет этого значения'})
          } 
        } 
      }
      return field_and_value
    }
    return null
  }
  async updateValues(putField:Field[], value, task:Task):Promise<{}>{
    if (putField.length){
      const field_and_value={}
      for (let field of putField){
        if(field.type=='string'){
          let stringDto:CreateStringFieldDto;
          stringDto = {value:value[field.name]}  
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['updateStringValue',stringDto.value,task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        }else if(field.type=='number'){
          let numberDto:CreateNumberFieldDto;
          numberDto = {value:value[field.name]}  
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['updateNumberValue',numberDto.value.toString(),task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        } else if(field.type=='enum'){
          if(field.enum_array.includes(value[field.name])){
            let stringDto:CreateStringFieldDto;
            stringDto = {value:value[field.name]} 
            const res=await this.amqpConnection.request<string>({
              exchange: 'exchange1',
              routingKey:'test',
              payload: {
                request: ['updateEnumValue',stringDto.value,task.id.toString(),field.id.toString()],
              },
              timeout: 30000,
            })
            console.log("res: ",res)
            field_and_value[field.name]=res
          }else{
            throw new ValidationException({message:'В списке нет этого значения'})
          } 
        }  
      }
      return field_and_value
    }
    return null
  }
  async deleteValues(putField:Field[],task:Task){
    if (putField.length){
      for (let field of putField){
        if(field.type=='string'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['deleteStringValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
        }else if(field.type=='number'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['deleteNumberValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
        } else if(field.type=='enum'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['deleteEnumValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
        }  
      }   
    }
  }
  async getValues(putField:Field[],task:Task):Promise<{}>{
    if (putField.length){
      const field_and_value={}
      for (let field of putField){
        if(field.type=='string'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['findOneStringValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        }else if(field.type=='number'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['findOneNumberValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        } else if(field.type=='enum'){
          const res=await this.amqpConnection.request<string>({
            exchange: 'exchange1',
            routingKey:'test',
            payload: {
              request: ['findOneEnumValue',task.id.toString(),field.id.toString()],
            },
            timeout: 30000,
          })
          console.log("res: ",res)
          field_and_value[field.name]=res
        }  
      } 
      return field_and_value
    }
    return null
  }
  async getManyValues(putField:Field[],tasks:Task[]):Promise<{}>{
    if (putField.length){
      const task_field_value={}
      for(let task of tasks){
        const field_and_value={}
        for (let field of putField){
          if(field.type=='string'){
            const res=await this.amqpConnection.request<string>({
                exchange: 'exchange1',
                routingKey:'test',
                payload: {
                  request: ['findOneStringValue',task.id.toString(),field.id.toString()],
                },
                timeout: 30000,
              })
              console.log("res: ",res)
              field_and_value[field.name]=res
              task_field_value[task.id]=field_and_value
          }else if(field.type=='number'){
            const res=await this.amqpConnection.request<string>({
              exchange: 'exchange1',
              routingKey:'test',
              payload: {
                request: ['findOneNumberValue',task.id.toString(),field.id.toString()],
              },
              timeout: 30000,
            })
            console.log("res: ",res)
            field_and_value[field.name]=res
            task_field_value[task.id]=field_and_value
          } else if(field.type=='enum'){
            const res=await this.amqpConnection.request<string>({
              exchange: 'exchange1',
              routingKey:'test',
              payload: {
                request: ['findOneEnumValue',task.id.toString(),field.id.toString()],
              },
              timeout: 30000,
            })
            console.log("res: ",res)
            field_and_value[field.name]=res
            task_field_value[task.id]=field_and_value
          }  
        }
      } 
      return task_field_value 
    }
    return null
  }

}