import {
  Document,
  FilterQuery,
  IfAny,
  Model,
  PopulateOptions,
  QueryOptions,
  Require_id,
  SaveOptions,
  UpdateQuery
} from 'mongoose'

export abstract class AbstractRepository<T extends Document> {
  model: Model<T>
  constructor(model: Model<T>) {
    this.model = model
  }

  findOne({ conditions, projection, populates, options }: RepositoryOption<T>): Promise<T | undefined> {
    const query = this.model.findOne(conditions, projection, options)
    query.populate(populates)
    return query.exec()
  }

  findMany({ conditions, projection, populates, options }: RepositoryOption<T>): Promise<Array<T>> {
    const query = this.model.find(conditions, projection, options)
    query.populate(populates)
    return query.exec()
  }

  async create(payload: Record<string, any>, options?: SaveOptions | undefined): Promise<T> {
    const entity = new this.model(payload)
    await entity.save(options)
    return entity
  }

  findOneAndDelete(
    conditions: FilterQuery<T>,
    options?: QueryOptions
  ): Promise<IfAny<T, any, Document<unknown, object, T> & Omit<Require_id<T>, never>>> {
    return this.model.findOneAndDelete(conditions, options).exec()
  }

  findOneAndUpdate(
    conditions: FilterQuery<T>,
    payload: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<
    import('mongoose').IfAny<T, any, Document<unknown, object, T> & Omit<import('mongoose').Require_id<T>, never>>
  > {
    return this.model.findOneAndUpdate(conditions, payload, options).exec()
  }
}

export type RepositoryOption<T> = {
  conditions: FilterQuery<T>
  projection?: Record<string, any> | string
  populates?: Array<PopulateOptions>
  options?: QueryOptions
}
