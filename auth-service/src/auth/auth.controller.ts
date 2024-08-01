import { Body, Controller, Get, Headers, Post, UsePipes,} from '@nestjs/common';
import { CreateDto } from 'src/Dto/create.dto';
import { AuthService } from './auth.service';
import { AuthDto } from '../Dto/auth.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/Dto/token';

  @ApiTags('Получение токенов')
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService
    ) {}
    @ApiOperation({summary:'Получить токены через регистрацию пользователя'})
    @ApiResponse({status:200, type:Promise<Token>})
    @UsePipes(ValidationPipe)
    @Post('registration')
    async registration(@Body()userDto:CreateDto){
      return await this.authService.registration(userDto)
    }
    @ApiOperation({summary:'Получить токены через вход в аккаунт пользователя'})
    @ApiResponse({status:200, type:Promise<Token>})
    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() body:AuthDto){
      return await this.authService.login(body)
    }
    @ApiOperation({summary:'Получить токены через обновление refresh-токена'})
    @ApiResponse({status:200, type:Promise<Token>})
    @Get('refresh')
    async refreshToken(@Headers() head){
      const authHeader:string = head.authorization;
      const token:string=authHeader.split(' ')[1];
      return await this.authService.refreshToken(token)
    }
  }