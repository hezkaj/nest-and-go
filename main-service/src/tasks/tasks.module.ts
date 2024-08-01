import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ValuesModule } from 'src/values/values.module';
import { FieldsModule } from 'src/fields/fields.module';
import { GuardModule } from 'src/guards/guard.module';
import { CreaterModule } from 'src/creater/creater.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>ValuesModule),
    forwardRef(()=>FieldsModule),
    CreaterModule,
    GuardModule,
   
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports:[TasksService]
})
export class TasksModule {}