import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Creater } from "./creater.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreaterService{
    constructor(

        @InjectRepository(Creater)private createrRepository:Repository<Creater>
    ){}
    async getCreater(req):Promise<Creater>{
        const user=await this.createrRepository.findOne({where:{id:req.user.id}})
        if(user)return user
        return await this.createrRepository.save({id:req.user.id})
    }
    async delCreater(id){
        const user=await this.createrRepository.findOne({where:{id:id}})
        if(user){ await this.createrRepository.delete(id)}
    }
}