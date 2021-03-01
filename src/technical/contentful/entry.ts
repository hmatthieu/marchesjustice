export interface Entry<T> {
  sys: {
    id: string;
  };
  fields: T;
}
