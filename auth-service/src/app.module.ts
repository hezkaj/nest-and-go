import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import env = require('../env-config') ;
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DATA_HOST,
      port: env.DATA_PORT,
      username: env.DATA_USER,
      password: env.DATA_PASS,
      database: env.DATA_NAME,
      entities: [
          User,
      ],
      synchronize:true,
      autoLoadEntities:true
  }),
  UsersModule,
  AuthModule,
  ConfigModule.forRoot()
  ]
})
export class AppModule {}
