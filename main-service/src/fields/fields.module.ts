import { Module, forwardRef } from "@nestjs/common";
import { Field } from "./field.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsModule } from "src/projects/projects.module";
import { FieldsService } from "./fields.service";
import { FieldsController } from "./fields.controller";
import { ValuesModule } from "src/values/values.module";
import { TasksModule } from "src/tasks/tasks.module";
import { ColumnsModule } from "src/columns/columns.module";
import { GuardModule } from "src/guards/guard.module";
import { CreaterModule } from "src/creater/creater.module";

@Module({
    imports: [
      TypeOrmModule.forFeature([Field]),
      forwardRef(()=>ProjectsModule),
      forwardRef(()=>ValuesModule),
      forwardRef(()=>TasksModule),
      forwardRef(()=>ColumnsModule),
      CreaterModule,
      GuardModule
    ],
    providers: [FieldsService],
    controllers: [FieldsController],
    exports:[FieldsService]
  })
  export class FieldsModule {}