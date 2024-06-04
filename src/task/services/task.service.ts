import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateTaskDto } from '~/task/dto/update-task.dto'
import { CreateTaskDto } from '~/task/dto/create-task.dto'
import { FilterQuery } from 'mongoose'
import { Task } from '~/task/schemas/task.schema'
import { TaskRepository } from '~/task/repositories/task.repository'
import { SuccessResponse } from '~/common/contracts/dto'
import { Errors } from '~/common/contracts/error'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<SuccessResponse> {
    await this.taskRepository.create({
      ...createTaskDto,
      createdBy: userId
    })
    return new SuccessResponse(true)
  }

  async findAll(filter: FilterQuery<Task>): Promise<Array<Task>> {
    const conditions: any = { createdBy: filter.createdBy }
    if (filter.priority !== undefined) {
      conditions.priority = filter.priority
    }

    if (filter.status !== undefined) {
      conditions.status = filter.status
    }
    const result = await this.taskRepository.findMany({
      conditions: conditions
    })
    return result
  }

  async findOne(filter: FilterQuery<Task>): Promise<Task> {
    const result = await this.taskRepository.findOne({
      conditions: {
        ...filter
      }
    })
    if (!result) {
      throw new NotFoundException(Errors.objectNotFound('Task', filter._id))
    }
    return result
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = await this.taskRepository.findOneAndUpdate(
      {
        createdBy: userId,
        _id: id
      },
      updateTaskDto,
      {
        returnDocument: 'after'
      }
    )
    if (!result) {
      throw new NotFoundException(Errors.objectNotFound('Task', id))
    }
    return result
  }

  async remove(userId: string, id: string): Promise<SuccessResponse> {
    const result = await this.taskRepository.findOneAndDelete({
      createdBy: userId,
      _id: id
    })
    if (!result) {
      throw new NotFoundException(Errors.objectNotFound('Task', id))
    }
    return new SuccessResponse(true)
  }
}
