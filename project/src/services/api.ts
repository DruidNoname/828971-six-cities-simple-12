import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import {REQUEST_TIMEOUT, URL_API} from '../constants';
import {getToken} from './token';
// import {processErrorHandle} from './process-error-module';
import {StatusCodes} from 'http-status-codes/build/cjs';
import {outputData} from '../store/output-data/output-data.slice';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    method: 'get',
    baseURL: URL_API,
    timeout: REQUEST_TIMEOUT,
  });

  const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true
  };

  const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

  //это перехватчик, способ вмешаться в запрос перед отправкой
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  // api.interceptors.request.use(
  //   (config: AxiosRequestConfig) => {
  //     console.log(config.data);
  //     return config;
  //   }
  // );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && shouldDisplayError(error.response)) {
        outputData.actions.setError(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};


