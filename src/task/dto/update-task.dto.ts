import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTaskDto } from './create-task.dto'
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { TaskPriority, TaskStatus } from '~/common/contracts/constant'

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(30)
  title: string

  @ApiProperty()
  @MaxLength(200)
  @IsOptional()
  description: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskPriority)
  priority: TaskPriority

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus
}
