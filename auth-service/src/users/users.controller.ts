import { Body, Controller, Delete, Get, Put,  Request,  UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ValidationPipe } from "src/validation/validation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { AuthDto } from "src/Dto/auth.dto";
import { ProfileDto } from "src/Dto/profile.dto";
import { User } from "./user.entity";
import { Message } from "src/Dto/message";
@ApiBearerAuth()
@ApiTags('действия с пользователями')
@Controller('/user')
export class UsersController{
    constructor(
        private userService:UsersService
    ){}
    /*@Get('/users')
    async getAllUsers(){
        return await this.userService.getAllUsers()
    }*/
    @ApiOperation({summary:'Получить профиль авторизованного пользователя'})
    @ApiResponse({status:200, type:Promise<User>})
    @ApiUnauthorizedResponse({status:401, description:'Не авторизованы'})
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    async getProfile(@Request() req){
        return await this.userService.getUser(req)
    }
    @ApiOperation({summary:'Выход из аккаунта авторизованного пользователя пользователя'})
    @ApiResponse({status:200, type:Promise<boolean>})
    @ApiUnauthorizedResponse({status:401, description:'Не авторизованы'})
    @UseGuards(AuthGuard('jwt'))
    @Get('/logout')
    async logout(@Request() req):Promise<boolean>{
        const date=new Date()
        await this.userService.updateRefresh(req.user.id, null, date)
        return true
    }
    @ApiOperation({summary:'Удаление аккаунта авторизованного пользователя'})
    @ApiResponse({status:200, type:Promise<Message>})
    @ApiUnauthorizedResponse({status:401, description:'Не авторизованы'})
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deleteUser(@Request() req):Promise<Message>{
        return await this.userService.deleteUser(req)
    }
    @ApiOperation({summary:'Изменение данных аутентификации авторизованного пользователя'})
    @ApiResponse({status:200, type:Promise<Message>})
    @ApiUnauthorizedResponse({status:401, description:'Не авторизованы'})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Put('/auth_params')
    async updateAuthParams(@Body()authDto:AuthDto, @Request() req):Promise<Message>{
        return await this.userService.updateAuthParams(req,authDto)
        
    }
    @ApiOperation({summary:'Изменение данных профиля авторизованного пользователя'})
    @ApiResponse({status:200, type:Promise<Object>})
    @ApiUnauthorizedResponse({status:401, description:'Не авторизованы'})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Put('/profile_params')
    async updateProfileParams(@Body()body:ProfileDto, @Request() req):Promise<Object>{
        return await this.userService.updateProfileParams(req,body)
    }
}