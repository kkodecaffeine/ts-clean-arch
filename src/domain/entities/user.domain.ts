import { Entity } from '../base.classes/entity.base';

// Properties that are needed for a user creation
export interface CreateUserProps {
  name: string;
  phone: string;
  address: string;
  address2: string;
  postcode: string;
  bankName: string;
  bankAccNumber: string;
}

// All properties that a user has
export interface UserProps extends CreateUserProps {
  id: number;
}

export class UserDomain extends Entity<UserProps> {
  static create(payload: CreateUserProps): UserDomain {
    const props: UserProps = {
      ...payload,
      id: 0,
    };
    const domain = new UserDomain({ props });

    return domain;
  }

  getId(): number {
    return this.props.id;
  }

  public getPropsCopy(): UserProps {
    const propsCopy = {
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }
}
