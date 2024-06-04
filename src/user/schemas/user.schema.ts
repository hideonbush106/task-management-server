import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { HydratedDocument } from 'mongoose'
import { Task } from '~/task/schemas/task.schema'

export type UserDocument = HydratedDocument<User>

@Schema({
  collection: 'users',
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
export class User {
  @Transform(({ value }) => value?.toString())
  _id: string

  @ApiProperty()
  @Prop({
    type: String,
    maxlength: 30,
    required: true
  })
  fullName: string

  @ApiProperty()
  @Prop({
    type: String,
    required: true
  })
  email: string

  @ApiProperty()
  @Prop({ type: String })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
