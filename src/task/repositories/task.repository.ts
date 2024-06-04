import { Global, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractRepository } from '~/common/repositories'
import { TaskDocument, Task } from '~/task/schemas/task.schema'

@Global()
@Injectable()
export class TaskRepository extends AbstractRepository<TaskDocument> {
  constructor(@InjectModel(Task.name) model: Model<TaskDocument>) {
    super(model)
  }
}
