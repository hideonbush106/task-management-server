import { Global, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractRepository } from '~/common/repositories'
import { User, UserDocument } from '~/user/schemas/user.schema'

@Global()
@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model)
  }
}
