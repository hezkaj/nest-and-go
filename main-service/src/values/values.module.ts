import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FieldsModule } from "src/fields/fields.module";
import { ProjectsModule } from "src/projects/projects.module";
import { ValuesService } from "./values.service";
import { ValuesController } from "./values.controller";
import { TasksModule } from "src/tasks/tasks.module";
import { ColumnsModule } from "src/columns/columns.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Module({
    imports: [
      forwardRef(()=>ProjectsModule),
      forwardRef(()=>FieldsModule),
      forwardRef(()=>TasksModule),
      forwardRef(()=>ColumnsModule),
      RabbitMQModule.forRoot(RabbitMQModule, {
        exchanges: [
          {
            name: 'exchange1',
            type: 'topic',
          },
        ],
        uri: 'amqp://guest:guest@myrabbit:5672',
        connectionInitOptions: { wait: false },
        
      }),
    ],
    providers: [ValuesService],
    controllers: [ValuesController],
    exports:[ValuesService]
  })
  export class ValuesModule {}