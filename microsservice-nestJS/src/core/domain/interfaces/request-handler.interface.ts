export interface IRequestHandler<T> {
  handle(...params: any): T;
}
