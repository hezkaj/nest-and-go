import { Module } from "@nestjs/common";
import { CreaterService } from "./creater.service";
import { CreaterController } from "./creater.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Creater } from "./creater.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'AUTH_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://myrabbit:5672'],
            queue: 'auth_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
      TypeOrmModule.forFeature([Creater]),
    ],
    providers: [CreaterService],
    controllers: [CreaterController],
    exports:[CreaterService]
  })
  export class CreaterModule {}