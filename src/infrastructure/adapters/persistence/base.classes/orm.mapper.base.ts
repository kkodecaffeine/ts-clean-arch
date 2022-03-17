import { CreateEntityProps } from '../../../../domain/base.classes/entity.base';
import { OrmEntityBase } from './orm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface EntityProps<EntityProps> {
  props: EntityProps;
}

export abstract class OrmMapper<DomainEntity, OrmEntity> {
  constructor(
    private entityConstructor: new (
      props: CreateEntityProps<any>,
    ) => DomainEntity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;
  protected abstract toOrmProps(
    entity: DomainEntity,
  ): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): DomainEntity {
    const { props } = this.toDomainProps(ormEntity);
    const ormEntityBase: OrmEntityBase = ormEntity as unknown as OrmEntityBase;
    return new this.entityConstructor({
      props,
    });
  }

  toOrmEntity(entity: DomainEntity): OrmEntity {
    const props = this.toOrmProps(entity);
    const aaa = new this.ormEntityConstructor({ ...props });
    const sss = Object.assign(aaa, props);
    return sss;
  }
}
