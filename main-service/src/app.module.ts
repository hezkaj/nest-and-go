import {Module} from '@nestjs/common';
import env = require('../env_config') ;
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column_ } from './columns/column_.entity';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';
import{ProjectsModule} from './projects/projects.module'
import{TasksModule} from './tasks/tasks.module'
import{ColumnsModule} from './columns/columns.module'
import { FieldsModule } from './fields/fields.module';
import { Field } from './fields/field.entity';
import { ValuesModule } from './values/values.module';
import { CreaterModule } from './creater/creater.module';
import { Creater } from './creater/creater.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.DATA_HOST,
            port: env.DATA_PORT,
            username: env.DATA_USER,
            password: env.DATA_PASSWORD,
            database: env.DATA_NAME,
            entities: [
                Column_,
                Task,
                Project,
                Field,
                Creater
            ],
            synchronize:true,
            autoLoadEntities:true
        }),
        CreaterModule,
        ProjectsModule,
        TasksModule,
        ColumnsModule,
        FieldsModule,
        ValuesModule,
        ConfigModule.forRoot()
    ]
})
export class AppModule{}
