/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from 'axios';

export const createResponseMock = async (data: unknown, status: number) => ({
  data,
  status,
  statusText: 'ok',
  headers: {},
  response: {
    status,
  },
  request: {},
});

export class CreateAxiosErrorMock implements AxiosError {
  message?: string;

  code?: string;

  config?: any;

  request?: any;

  response?: AxiosResponse<any, any>;

  constructor({
    message,
    code,
    request,
    response,
  }: {
    message?: string;
    code?: string;
    request?: any;
    response?: {
      data: any;
      status: number;
      statusText?: string;
      headers?: any;
      config?: any;
      request?: any;
    };
  }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.config = { headers: {} } as any;
    this.message = message;
    this.code = code;
    this.request = request;
    this.response = response as any;
  }
}
