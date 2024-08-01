import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { Column_ } from './column_.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { FieldsModule } from 'src/fields/fields.module';
import { ValuesModule } from 'src/values/values.module';
import { GuardModule } from 'src/guards/guard.module';
import { CreaterModule } from 'src/creater/creater.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Column_]),
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>TasksModule),
    forwardRef(()=>FieldsModule),
    forwardRef(()=>ValuesModule),
    CreaterModule,
    GuardModule
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports:[ColumnsService]
})
export class ColumnsModule {}