import { RepositoryPort } from '../base.classes/repository.ports';
import { UserDomain, UserProps } from '../entities/user.domain';

export type UserRepositoryPort = RepositoryPort<UserDomain, UserProps>;
