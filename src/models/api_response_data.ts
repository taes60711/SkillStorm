export interface APIResponseData<T> {
  statusCode: string;
  statusMessage: string;
  data: T;
}
