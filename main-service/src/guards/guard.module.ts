import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './accessToken.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,

  ],
  controllers: [],
  providers: [AccessTokenStrategy],
  exports:[AccessTokenStrategy]
})
export class GuardModule {}