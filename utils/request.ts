import queryString from 'query-string';
import { HttpMethods, ContentTypes } from '../enums/http';
import { IKeyValue } from '../interfaces/ICommon';
import { ParseOption, ResponseAPI, RestClientParams } from '../interfaces/IRequest';

const injectPathParameters = (url: string, pathParameters: IKeyValue<string> = {}) =>
  Object.keys(pathParameters).reduce(
    (acc, parameter: string) =>
      acc.replace(new RegExp(`{{${parameter}}}`, 'gm'), pathParameters[parameter]),
    url,
  );

const getHeaders = (customHeaders: IKeyValue<string>): Headers => {
  return new Headers({
    'Content-Type': 'application/json',
    ...customHeaders,
  });
};

const parseOptions = <T>({
  url,
  queryParams = {},
  pathParameters,
  method = HttpMethods.GET,
  headers = {},
  body,
}: RestClientParams<T>) => {
  const options: ParseOption = {
    endpoint: `${injectPathParameters(url, pathParameters)}?${queryString.stringify(queryParams, {
      skipNull: true,
    })}`,
    options: {
      method,
      headers: getHeaders(headers),
    },
  };
  if (typeof body === 'object' && JSON.stringify(body)) {
    options.options.body = JSON.stringify(body);
  }
  return options;
};

const parseJson = async <T>(response: Response, parseResponse: boolean): Promise<T> => {
  const { headers } = response;
  const text = await response.text();
  return parseResponse && headers.get(ContentTypes.contentType) && !!text ? JSON.parse(text) : text;
};

const handleResponse = async <T>(
  response: Response,
  { parseResponse = true },
): Promise<ResponseAPI<T>> => {
  const { status, headers } = response;
  const json = await parseJson<T>(response, parseResponse);

  if (status < 200 || status >= 400) {
    return Promise.reject({ status, json, headers });
  }

  return Promise.resolve({
    status,
    json,
    headers,
  });
};

const request = async <T, R>(requestParams: RestClientParams<T>): Promise<ResponseAPI<R>> => {
  const { parseResponse } = requestParams;
  const { endpoint, options } = parseOptions(requestParams);
  const response = await fetch(endpoint, { ...options });
  return handleResponse<R>(response, { parseResponse });
};

export default request;
