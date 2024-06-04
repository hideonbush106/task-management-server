import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { HydratedDocument } from 'mongoose'
import { TaskPriority, TaskStatus } from '~/common/contracts/constant'

export type TaskDocument = HydratedDocument<Task>

@Schema({
  collection: 'tasks',
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.__v
    }
  }
})
export class Task {
  @Transform(({ value }) => value?.toString())
  _id: string

  @ApiProperty()
  @Prop({
    type: String,
    maxlength: 30,
    required: true
  })
  title: string

  @ApiProperty()
  @Prop({
    type: String,
    maxlength: 200,
    required: false
  })
  description: string

  @ApiProperty()
  @Prop({
    enum: TaskStatus,
    default: TaskStatus.INCOMPLETE
  })
  status: TaskStatus

  @ApiProperty()
  @Prop({
    enum: TaskPriority,
    default: TaskPriority.CRITICAL
  })
  priority: TaskPriority

  @ApiProperty()
  @Prop({ type: String, required: true, index: true })
  createdBy: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
