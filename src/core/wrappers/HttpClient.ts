/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';

export interface IHttpClientResponse<T> {
  data: T;
}

// return configAxios.get(relativeUrl, { ...configs, cancelToken: source.token });

export class HttpClient {
  private client: AxiosInstance;

  private cancelTokens: CancelTokenSource[];

  constructor(apiBaseUrl: string) {
    this.client = axios.create({
      baseURL: apiBaseUrl,
      timeout: 0,
    });

    this.cancelTokens = [];
  }

  private createCancelToken<T extends Object>(config: T): T {
    const source = axios.CancelToken.source();
    this.cancelTokens.push(source);

    return { ...config, cancelToken: source.token };
  }

  public async middlewareResponse(
    onFulfilled?: (value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>,
    onRejected?: (error: any) => any,
  ): Promise<void> {
    this.client.interceptors.response.use(onFulfilled, onRejected);
  }

  public async middlewareRequest(
    onFulfilled?: (value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>,
    onRejected?: (error: any) => any,
  ): Promise<void> {
    this.client.interceptors.request.use(onFulfilled, onRejected);
  }

  public cancelAllRequests(): void {
    this.cancelTokens.forEach((source) => {
      source.cancel('Request canceled by user');
    });

    this.cancelTokens = [];
  }

  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<IHttpClientResponse<T>> {
    return this.client.get(url, this.createCancelToken(config));
  }

  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<IHttpClientResponse<T>> {
    return this.client.delete(url, this.createCancelToken(config));
  }

  public async post<T = unknown>(
    url: string,
    data?: AxiosRequestConfig<any> | undefined,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<IHttpClientResponse<T>> {
    return this.client.post(url, data, this.createCancelToken(config));
  }

  public async put<T = unknown>(
    url: string,
    data?: AxiosRequestConfig<any> | undefined,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<IHttpClientResponse<T>> {
    return this.client.put(url, data, this.createCancelToken(config));
  }

  public async patch<T = unknown>(
    url: string,
    data?: AxiosRequestConfig<any> | undefined,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<IHttpClientResponse<T>> {
    return this.client.patch(url, data, this.createCancelToken(config));
  }
}
