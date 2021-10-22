export interface IKeyValue<T> {
  [key: string]: T;
}

export type Modify<T, R> = Omit<T, keyof R> & R;
