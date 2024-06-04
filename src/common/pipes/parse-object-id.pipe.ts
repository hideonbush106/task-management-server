import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'
import { Errors } from '~/common/contracts/error'

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    const validObjectId = Types.ObjectId.isValid(value)
    if (!validObjectId) throw new NotFoundException(Errors.objectNotFound('Task', value))

    return Types.ObjectId.createFromHexString(value)
  }
}
