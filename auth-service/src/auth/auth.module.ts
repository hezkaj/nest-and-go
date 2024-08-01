import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET')
      }),
      inject:[ConfigService]
    }),
    forwardRef(()=> UsersModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  exports:[AccessTokenStrategy]
})
export class AuthModule {}