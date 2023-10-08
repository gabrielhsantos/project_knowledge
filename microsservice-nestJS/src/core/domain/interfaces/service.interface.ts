export interface ICreateService<P, R> {
  create(params: P): R;
}
