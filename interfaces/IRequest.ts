import { HttpMethods } from '../enums/http';
import { IKeyValue } from './ICommon';

export interface ParseOption {
  endpoint: string;
  options: RequestInit;
}

export interface ResponseAPI<T> {
  status: number;
  json: T;
  headers: Headers;
}

export interface RequestParams<T> {
  id?: string;
  body?: T;
  queryParams?: IKeyValue<string | number>;
  pathParameters?: IKeyValue<string>;
  headers?: IKeyValue<string>;
}

export interface RestClientParams<T> {
  url: string;
  method: HttpMethods;
  parseResponse?: boolean;
  id?: string;
  body?: T;
  queryParams?: IKeyValue<string | number | boolean>;
  pathParameters?: IKeyValue<string>;
  headers?: IKeyValue<string>;
}
