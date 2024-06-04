import { ApiProperty } from '@nestjs/swagger'
import { TaskPriority, TaskStatus } from '~/common/contracts/constant'
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  title: string

  @ApiProperty()
  @MaxLength(200)
  @IsOptional()
  description: string

  @ApiProperty()
  @IsEnum(TaskPriority)
  priority: TaskPriority
}
