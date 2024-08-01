import { Body, Controller, Delete, Get, Request, Param, Patch, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { ColumnsService } from "./columns.service";
import { ProjectsService } from "src/projects/projects.service";
import { CreateColumnDto } from "./column_.dto";
import { ValidationPipe } from "src/validation/validation.pipe";
import { Column_ } from "./column_.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreaterService } from "src/creater/creater.service";
import { AuthGuard } from "@nestjs/passport";
import { Project } from "src/projects/project.entity";
@ApiTags('действия с столбцами')
@Controller('column/:project_id')
export class ColumnsController{
    constructor(
        private columnService:ColumnsService,
        private projectService: ProjectsService,
        private createrService:CreaterService
    ){}
    @ApiOperation({summary:'Создание столбца'})
    @ApiResponse({status:200, type:Promise<Column_>})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Post('/')
    async createColumn(@Request() req, @Body() columnDto:CreateColumnDto, 
      @Param() param):Promise<Column_>{
        const project = await this.findParent(req, param)
        return await this.columnService.createColumn(project, columnDto)
    }
    @ApiOperation({summary:'Получениие всех столбцов проекта'})
    @ApiResponse({status:200, type:Promise<Column_[]>})
    @UseGuards(AuthGuard('jwt'))
    @Get('/columns')
    async getAllColumns(@Request() req, @Param() param):Promise<Column_[]>{
        const project = await this.findParent(req, param)
        return await this.columnService.getAllColumns(project)
    }
    @ApiOperation({summary:'Получениие столбца по айди'})
    @ApiResponse({status:200, type:Promise<Column_>})
    @UseGuards(AuthGuard('jwt'))
    @Get('/:column_id')
    async getOneColumn(@Request() req, @Param() param):Promise<Column_>{
        const project = await this.findParent(req, param)
        return await this.columnService.getOneColumn(project, param)
    }
    @ApiOperation({summary:'Удаление столбца по айди'})
    @ApiResponse({status:200, type:Promise<boolean>})
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:column_id')
    async deleteColumn(@Request() req, @Param() param):Promise<boolean>{
        const project = await this.findParent(req, param)
        return await this.columnService.deleteColumn(project, param)
    }
    @ApiOperation({summary:'Изменение положения столбца внутри проекта по айди'})
    @ApiResponse({status:200, type:Promise<Column_[]>})
    @UseGuards(AuthGuard('jwt'))
    @Patch('/:column_id')
    async repozColumn(@Request() req, @Body() body, @Param() param):Promise<Column_[]>{
        const project = await this.findParent(req, param)
        return await this.columnService.repozColumn(project,param,body.pozition)
    }
    @ApiOperation({summary:'Редактирование стобца по айди'})
    @ApiResponse({status:200, type:Promise<Column_>})
    @UseGuards(AuthGuard('jwt'))
    @Put('/:column_id')
    async updateColumn(@Request() req, @Body() columnDto:CreateColumnDto, @Param() param):Promise<Column_>{
        const project = await this.findParent(req, param)
        return await this.columnService.updateColumn(project,param,columnDto)
    }
////вспомогательная функция
    async findParent(req, param):Promise<Project>{
        const creater=await this.createrService.getCreater(req)
        return await this.projectService.getOneProject(creater, param)
    }
}