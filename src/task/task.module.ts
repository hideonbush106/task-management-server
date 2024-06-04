import { Module } from '@nestjs/common'
import { TaskService } from '~/task/services/task.service'
import { TaskController } from './controllers/task.controller'
import { TaskRepository } from './repositories/task.repository'
import { Task, TaskSchema } from './schemas/task.schema'
import { UserSchema } from '~/user/schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository],
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])]
})
export class TaskModule {}
