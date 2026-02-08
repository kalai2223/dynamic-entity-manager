export interface BaseEntity {
  id: string;
}

export interface EntityState<T extends BaseEntity> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export type EntitiesState<T extends BaseEntity> = {
  [entityName: string]: EntityState<T>;
};

