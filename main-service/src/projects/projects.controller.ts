import {  Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, Request } from "@nestjs/common";
import { CreateProjectDto } from "./project.dto";
import { ProjectsService } from "./projects.service";
import { ValidationPipe } from "src/validation/validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Project } from "./project.entity";
import { CreaterService } from "src/creater/creater.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('действия с проектами')
@Controller('project/')
export class ProjectsController{
    constructor(
        private projectService: ProjectsService,
        private createrService:CreaterService
    ){}
    @ApiOperation({summary:'Создание проекта'})
    @ApiResponse({status:200, type:Promise<Project>})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Post('/')
    async createProject(@Request()req, @Body() projectDto:CreateProjectDto):Promise<Project>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.createProject(creater, projectDto)
    }
    @ApiOperation({summary:'Получение всех проектов пользователя'})
    @ApiResponse({status:200, type:Promise<Project[]>})
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getAllProjects(@Request()req):Promise<Project[]>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.getAllProjects(creater)
    }
    @ApiOperation({summary:'Получение проекта по айди'})
    @ApiResponse({status:200, type:Promise<Project>})
    @UseGuards(AuthGuard('jwt'))
    @Get('/:project_id')
    async getOneProject(@Request()req, @Param() param):Promise<Project>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.getOneProject(creater, param)
    }
    @ApiOperation({summary:'Удаление проекта по айди'})
    @ApiResponse({status:200, type:Promise<boolean>})
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:project_id')
    async deleteProject(@Request()req, @Param() param):Promise<boolean>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.deleteProject(creater, param)
    }
    @ApiOperation({summary:'Редактирование проекта по айди'})
    @ApiResponse({status:200, type:Promise<Project>})
    @UseGuards(AuthGuard('jwt'))
    @Put('/:project_id')
    async updateProject(@Request()req, @Param() param, @Body() projectDto:CreateProjectDto):Promise<Project>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.updateProject(creater,param, projectDto)
    }
    
}