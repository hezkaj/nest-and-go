import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { FieldsService } from "./fields.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "src/projects/projects.service";
import { Field } from "./field.entity";
import { ValidationPipe } from "src/validation/validation.pipe";
import { CreateFieldDto } from "./field.dto";
import { AuthGuard } from "@nestjs/passport";
import { CreaterService } from "src/creater/creater.service";

@ApiTags('действия с полями задач')
@Controller('field/:project_id')
export class FieldsController{
    
    constructor(
        private createrService: CreaterService,
        private fieldService:FieldsService,
        private projectService:ProjectsService,
        
    ){}
    @ApiOperation({summary:'Создание поля задач'})
    @ApiResponse({status:200, type:Promise<Field>})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Post('/')
    async createField(@Request() req, @Body() fieldDto:CreateFieldDto, @Param() param):Promise<Field>{
        const creater=await this.createrService.getCreater(req)
        const project= await this.projectService.getOneProject(creater,param)
        return await this.fieldService.fieldCreate(project,fieldDto)
    }
    @ApiOperation({summary:'Получение полей задач проекта'})
    @ApiResponse({status:200, type:Promise<Field[]>})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Get('/')
    async getAllFields(@Request() req, @Param() param):Promise<Field[]>{
        const creater=await this.createrService.getCreater(req)
        const project= await this.projectService.getOneProject(creater,param)
        return await this.fieldService.getAllField(project)
    }
    @ApiOperation({summary:'Удаление поля задач по фйди'})
    @ApiResponse({status:200, type:Promise<boolean>})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Delete('/:field_id')
    async deleteField(@Request() req, @Param() param):Promise<boolean>{
        const creater=await this.createrService.getCreater(req)
        const project= await this.projectService.getOneProject(creater,param)
        return await this.fieldService.deleteField(project, param )
    }

}//