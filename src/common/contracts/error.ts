import { HttpStatus } from '@nestjs/common'

export const Errors = {
  wrongEmailOrPassword: {
    error: 'WRONG_EMAIL_OR_PASSWORD',
    message: 'Incorrect email or password',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  objectNotFound: (object: string, id: string) => ({
    error: `${object.toUpperCase()}-NOT-FOUND`,
    message: `${object} not found with ${id}`,
    httpStatus: HttpStatus.NOT_FOUND
  }),
  userAlreadyExist: {
    error: 'USER-ALREADY-EXIST',
    message: 'User already exist',
    httpStatus: HttpStatus.CONFLICT
  }
}
