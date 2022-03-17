export type QueryParams<DomainProps> = Partial<DomainProps>;

export interface Save<Domain> {
  save(domain: Domain): Promise<Domain>;
}

export interface SaveMultiple<Domain> {
  saveMultiple(domains: Domain[]): Promise<Domain[]>;
}

export interface FindOne<Domain, EntityProps> {
  findOneOrThrow(params: QueryParams<EntityProps>): Promise<Domain>;
}

export interface FindOneById<Domain> {
  findOneByIdOrThrow(id: number | string): Promise<Domain>;
}

export interface FindMany<Domain, DomainProps> {
  findMany(params: QueryParams<DomainProps>): Promise<Domain[]>;
}

export interface OrderBy {
  [key: number]: -1 | 1;
}

export interface PaginationMeta {
  skip?: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginatedParams<DomainProps> {
  params?: QueryParams<DomainProps>;
  pagination?: PaginationMeta;
  orderBy?: OrderBy;
}

export interface DataWithPaginationMeta<T> {
  data: T;
  count: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginated<Domain, DomainProps> {
  findManyPaginated(
    options: FindManyPaginatedParams<DomainProps>,
  ): Promise<DataWithPaginationMeta<Domain[]>>;
}

export interface DeleteOne<Domain> {
  delete(domain: Domain): Promise<Domain>;
}

export interface RepositoryPort<Domain, DomainProps>
  extends Save<Domain>,
    FindOne<Domain, DomainProps>,
    FindOneById<Domain>,
    FindMany<Domain, DomainProps>,
    FindManyPaginated<Domain, DomainProps>,
    DeleteOne<Domain>,
    SaveMultiple<Domain> {}
