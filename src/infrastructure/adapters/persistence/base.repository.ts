import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import {
  DataWithPaginationMeta,
  FindManyPaginatedParams,
  QueryParams,
} from '../../../domain/base.classes/repository.ports';
import { RepositoryPort } from '../../../domain/base.classes/repository.ports';
import { OrmMapper } from '../persistence/base.classes/orm.mapper.base';

export type WhereCondition<OrmEntity> =
  | FindConditions<OrmEntity>[]
  | FindConditions<OrmEntity>
  | ObjectLiteral
  | string;

export abstract class BaseRepository<Entity, EntityProps, OrmEntity>
  implements RepositoryPort<Entity, EntityProps>
{
  protected constructor(
    readonly mapper: OrmMapper<Entity, OrmEntity>,
    readonly repository: Repository<OrmEntity>,
  ) {}

  protected abstract relations: string[];

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): WhereCondition<OrmEntity>;

  public async save(entity: Entity): Promise<Entity> {
    try {
      const ormEntity = this.mapper.toOrmEntity(entity);
      const result = await this.repository.save(ormEntity);

      return this.mapper.toDomainEntity(result);
    } catch (error) {
      console.log(error);
    }
  }

  async saveMultiple(entities: Entity[]): Promise<Entity[]> {
    try {
      const ormEntities = entities.map((entity) => {
        return this.mapper.toOrmEntity(entity);
      });
      const result = await this.repository.save(ormEntities);
      return result.map((entity) => this.mapper.toDomainEntity(entity));
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(
    params: QueryParams<EntityProps> = {},
  ): Promise<Entity | undefined> {
    const where = this.prepareQuery(params);
    const found = await this.repository.findOne({
      where,
      relations: this.relations,
    });
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneOrThrow(params: QueryParams<EntityProps> = {}): Promise<Entity> {
    const found = await this.findOne(params);
    if (!found) {
      return null;
    }
    return found;
  }

  async findOneByIdOrThrow(id: number | string): Promise<Entity> {
    const found = await this.repository.findOne({
      where: { id: id },
    });
    if (!found) {
      return null;
    }
    return this.mapper.toDomainEntity(found);
  }

  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
      relations: this.relations,
    });

    return result.map((item) => this.mapper.toDomainEntity(item));
  }

  async findManyPaginated({
    params = {},
    pagination,
    orderBy,
  }: FindManyPaginatedParams<EntityProps>): Promise<
    DataWithPaginationMeta<Entity[]>
  > {
    const [data, count] = await this.repository.findAndCount({
      skip: pagination?.skip,
      take: pagination?.limit,
      where: this.prepareQuery(params),
      order: orderBy,
      relations: this.relations,
    });

    const result: DataWithPaginationMeta<Entity[]> = {
      data: data.map((item) => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    };

    return result;
  }

  async delete(entity: Entity): Promise<Entity> {
    await this.repository.remove(this.mapper.toOrmEntity(entity));
    return entity;
  }

  protected correlationId?: string;

  setCorrelationId(correlationId: string): this {
    this.correlationId = correlationId;
    this.setContext();
    return this;
  }

  private setContext() {
    if (this.correlationId) {
      //   this.logger.setContext(`${this.constructor.name}:${this.correlationId}`);
    } else {
      //   this.logger.setContext(this.constructor.name);
    }
  }
}
