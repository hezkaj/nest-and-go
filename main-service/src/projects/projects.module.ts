import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { FieldsModule } from 'src/fields/fields.module';
import { CreaterModule } from 'src/creater/creater.module';
import { GuardModule } from 'src/guards/guard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>TasksModule),
    forwardRef(()=>FieldsModule),
    CreaterModule,
    GuardModule
  ],
  providers: [ProjectsService, ],
  controllers: [ProjectsController],
  exports:[
    ProjectsService
  ]
})
export class ProjectsModule {}