import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '../base.classes/orm.mapper.base';
import { UserDomain, UserProps } from '../../../../domain/entities/user.domain';
import { User } from '../entities/User';

export class OrmAreaMapper extends OrmMapper<UserDomain, User> {
  protected toOrmProps(domain: UserDomain): OrmEntityProps<User> {
    const props = domain.getPropsCopy();

    const ormEntity: OrmEntityProps<User> = {
      name: props.name,
      phone: props.phone,
      address: props.address,
      address2: props.address2,
      postcode: props.postcode,
      bankName: props.bankName,
      bankAccNumber: props.bankAccNumber,
    };

    return ormEntity;
  }

  protected toDomainProps(ormEntity: User): EntityProps<UserProps> {
    const domain: UserProps = {
      id: ormEntity.id,
      name: ormEntity.name,
      phone: ormEntity.phone,
      address: ormEntity.address,
      address2: ormEntity.address2,
      postcode: ormEntity.postcode,
      bankName: ormEntity.bankName,
      bankAccNumber: ormEntity.bankAccNumber,
    };
    return { props: domain };
  }
}
