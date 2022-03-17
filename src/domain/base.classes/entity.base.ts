export interface CreateEntityProps<T> {
  props: T;
}

export abstract class Entity<EntityProps> {
  constructor({ props }: CreateEntityProps<EntityProps>) {
    this.props = props;
  }

  protected readonly props: EntityProps;

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public getPropsCopy(): EntityProps {
    const propsCopy = {
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }
}
